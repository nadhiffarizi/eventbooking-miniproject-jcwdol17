import { Request } from "express";
import { prisma } from "../config";
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { statusEnum } from "../helper/statusEnum.helper";
import { getUserByEmail } from "../helper/AuthService/authService.helper";
import { sendAcceptPayment, sendRejectPayment } from "../helper/Transaction/transactionService.helper";
import { calculateDeadline } from "../helper/date.helper";

class TransactionService {

    // create event
    public async createTransaction(req: Request) {
        // dummy function. when trx created it directly creates with status: WAITING ADMIN

        const { slug, amount } = req.body
        const userRole = req.user?.role
        if (userRole?.toUpperCase() !== 'CUSTOMER') {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "role is invalid. Cannot create trx",
                data: req.user?.role,
                code: 400
            }
            return feedback;
        }

        // checks event
        const eventData = await prisma.event.findUnique({
            where: {
                slug: String(slug)
            }
        })
        if (!eventData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Cannot find event",
                data: null,
                code: 400
            }
            return feedback;
        }

        try {
            // add transaction
            await prisma.transaction.create({
                data: {
                    customer_id: req.user?.id!,
                    booked_time: new Date(),
                    event_id: eventData.id,
                    amount: eventData.price,
                    payment_status: 'WAITING ADMIN', // options: waiting payment, waiting admin, done, rejected, expired, canceled,
                    payment_proof_link: null
                }
            })

            // update seat available in the event
            await prisma.event.update({
                where: {
                    id: eventData.id
                }, data: {
                    seat_available: eventData.seat_available - 1
                }
            })

            const feedback: serviceFeedback = {
                status: statusEnum.SUCCESS,
                message: "test create transaction",
                data: null,
                code: 200
            }
            return feedback;
        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Create transaction failed",
                data: null,
                code: 400
            }
            return feedback;
        }

    }

    // accept transaction
    public async acceptTransaction(req: Request) {
        const { id } = req.params
        // get trx
        const trxData = await prisma.transaction.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!trxData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "transaction not found",
                data: null,
                code: 400
            }
            return feedback;
        }

        // get event
        const eventData = await prisma.event.findUnique({
            where: {
                id: trxData.event_id
            }
        })
        if (!eventData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "event not found",
                data: null,
                code: 400
            }
            return feedback;
        }

        try {
            // update payment status
            await prisma.transaction.update({
                where: {
                    id: Number(id),
                    AND: {
                        payment_status: 'WAITING ADMIN'
                    }
                }, data: {
                    payment_status: "ACCEPT"
                }
            })

            // console.log(id);
            // get user(customer)
            const customer = await prisma.user.findUnique({
                where: {
                    id: trxData.customer_id
                }
            })
            if (!customer) {
                const feedback: serviceFeedback = {
                    status: statusEnum.FAILED,
                    message: "customer not found",
                    data: null,
                    code: 400
                }
                return feedback;
            }

            // send notification email after accepted
            await sendAcceptPayment(customer, { event_name: eventData.event_name, date: eventData.date.toISOString(), location: eventData.location }, trxData.amount)

            const feedback: serviceFeedback = {
                status: statusEnum.SUCCESS,
                message: "transaction accepted successfully",
                data: null,
                code: 200
            }
            return feedback;

        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "transaction accept request failed",
                data: null,
                code: 400
            }
            return feedback;
        }

    }

    // reject transaction
    public async rejectTransaction(req: Request) {

        const { id } = req.params

        // get trx
        const trxData = await prisma.transaction.findUnique({
            where: {
                id: Number(id),
                payment_status: 'WAITING ADMIN'
            }
        })
        if (!trxData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "transaction not found",
                data: null,
                code: 400
            }
            return feedback;
        }

        // get event
        const eventData = await prisma.event.findUnique({
            where: {
                id: trxData.event_id
            }
        })
        if (!eventData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "event not found",
                data: null,
                code: 400
            }
            return feedback;
        }

        try {
            await prisma.transaction.update({
                where: {
                    id: Number(id)
                }, data: {
                    payment_status: "REJECT"
                }
            })

            // update seat
            await prisma.event.update({
                where: {
                    id: eventData.id
                }, data: {
                    capacity: eventData.seat_available + 1
                }
            })

            // update coupon and return point
            // get customer
            const userData = await prisma.user.findUnique({
                where: {
                    id: trxData.customer_id
                }
            })
            // update user
            await prisma.user.update({
                where: {
                    id: trxData.customer_id
                }, data: {
                    point_balance: userData?.point_balance! + 10000,
                    point_expired_date: calculateDeadline(userData?.point_expired_date!, 30),
                    coupon: userData?.coupon! + 5000,
                    coupon_expired: calculateDeadline(userData?.coupon_expired!, 30)
                }

            })

            // get user(customer)
            const customer = await prisma.user.findUnique({
                where: {
                    id: trxData.customer_id
                }
            })
            if (!customer) {
                const feedback: serviceFeedback = {
                    status: statusEnum.FAILED,
                    message: "customer not found",
                    data: null,
                    code: 400
                }
                return feedback;
            }

            // console.log(id);


            // send notification email after rejected
            await sendRejectPayment(customer, { event_name: eventData.event_name, date: eventData.date.toISOString(), location: eventData.location }, trxData.amount)

            const feedback: serviceFeedback = {
                status: statusEnum.SUCCESS,
                message: "transaction rejected successfully",
                data: null,
                code: 200
            }
            return feedback;

        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "transaction rejected request failed",
                data: null,
                code: 400
            }
            return feedback;
        }

    }

    // get waiting confirmation TRX
    public async getPendingTrx(req: Request) {
        const { organizer_id, offset, take } = req.params

        // check role
        if (req.user?.role !== 'ORGANIZER') {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "role denied",
                data: null,
                code: 400
            }
            return feedback;
        }

        try {
            const trxData = await prisma.transaction.findMany({
                select: {
                    amount: true,
                    booked_time: true,
                    customer: {
                        select: {
                            first_name: true
                        }
                    },
                    event: {
                        select: {
                            event_name: true
                        }
                    },
                    payment_proof_link: true,
                    payment_status: true,
                    id: true
                },
                where: {
                    event: {
                        organizer_id: Number(organizer_id)
                    },
                },
                orderBy: {
                    booked_time: 'desc'
                },
                skip: Number(offset),
                take: Number(take)
            })

            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Waiting admin transactions fetched",
                data: trxData,
                code: 400
            }
            return feedback;

        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "transaction not found",
                data: null,
                code: 400
            }
            return feedback;

        }


    }

    // get total page trx pending
    public async getPendingTrxTotalPage(req: Request) {
        // checks role
        const role = req.user?.role
        if (role !== 'ORGANIZER') {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Wrong user role",
                data: null,
                code: 400
            }
            return feedback;
        }

        const { organizer_id } = req.params

        try {
            const count = await prisma.transaction.count({
                where: {
                    event: {
                        organizer_id: Number(organizer_id)
                    }
                }
            })

            let totalPage: number = 0;

            if (count < 4) {
                totalPage = 1
                const feedback: serviceFeedback = {
                    status: statusEnum.SUCCESS,
                    message: "Fetched total page pending trx",
                    data: { 'totalPage': 1, 'countData': count },
                    code: 200
                }
                return feedback;
            }

            if (count % 4 === 0) {
                totalPage = count / 4
                const feedback: serviceFeedback = {
                    status: statusEnum.SUCCESS,
                    message: "Fetched total page pending trx",
                    data: { 'totalPage': totalPage, 'countData': count },
                    code: 200
                }
                return feedback;
            } else {
                // count % 1 !== 0
                const tempPage = Math.floor(count / 4)
                totalPage = tempPage + 1
                const feedback: serviceFeedback = {
                    status: statusEnum.SUCCESS,
                    message: "Fetched total page pending trx",
                    data: { 'totalPage': totalPage, 'countData': count },
                    code: 200
                }
                return feedback;

            }

        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched data failed",
                data: null,
                code: 400
            }
            return feedback;

        }
    }

    // get trx by id
    public async getTrxById(req: Request) {
        const { id } = req.params
        try {
            const data = await prisma.transaction.findUnique({
                where: {
                    id: Number(id)
                }
            })
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched data trx success",
                data: data,
                code: 200
            }
            return feedback;

        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched data failed",
                data: null,
                code: 400
            }
            return feedback;
        }



    }



}

export default new TransactionService();