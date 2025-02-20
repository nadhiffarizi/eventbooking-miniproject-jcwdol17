import { Request } from "express";
import { prisma } from "../config";
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { statusEnum } from "../helper/statusEnum.helper";
import { getUserByEmail } from "../helper/AuthService/authService.helper";

class EventService {

    // create event
    public async createEvent(req: Request) {
        const { email, event_name, speaker, location, date, capacity, price, description } = req.body

        // find user 
        const organizerData = await getUserByEmail(String(email!))
        if (!organizerData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Organizer is invalid",
                data: null,
                code: 400
            }
            return feedback;
        }
        try {
            await prisma.event.create({
                data: {
                    organizer_id: organizerData?.id,
                    speaker: speaker as string,
                    event_name: event_name,
                    location: location,
                    date: new Date(),
                    price: Number(price),
                    description: description,
                    image_url: "",
                    capacity: Number(capacity),
                    seat_available: Number(capacity),
                    created_at: new Date(),
                    slug: String(event_name)
                }
            })
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "test create event",
                data: null,
                code: 200
            }
            return feedback;
        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Create event failed",
                data: null,
                code: 400
            }
            return feedback;
        }

    }

    // create event
    public async getRegistrantList(req: Request) {

        const { slug } = req.params

        // find users

        try {
            const usersData = await prisma.transaction.findMany({
                select: {
                    customer: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            image_url: true,
                            email: true
                        }
                    },
                    amount: true,

                }, where: {
                    payment_status: 'ACCEPT',
                    event: {
                        slug: slug
                    }

                }
            })



            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched Data",
                data: usersData,
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

    // get manage list total page
    public async getTotalEventPage(req: Request) {
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
            const count = await prisma.event.count({
                where: {
                    organizer_id: Number(organizer_id)
                }
            })

            let totalPage: number = 0;

            if (count < 4) {
                totalPage = 1
                const feedback: serviceFeedback = {
                    status: statusEnum.SUCCESS,
                    message: "Fetched total page",
                    data: { 'totalPage': 1, 'countData': count },
                    code: 200
                }
                return feedback;
            }

            if (count % 4 === 0) {
                totalPage = count / 4
                const feedback: serviceFeedback = {
                    status: statusEnum.SUCCESS,
                    message: "Fetched total page",
                    data: { 'totalPage': totalPage, 'countData': count },
                    code: 200
                }
                return feedback;
            } else {
                // count % 5 !== 0
                const tempPage = Math.floor(count / 4)
                totalPage = tempPage + 1
                const feedback: serviceFeedback = {
                    status: statusEnum.SUCCESS,
                    message: "Fetched total page",
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

    // get event by organizer
    public async getManageEventList(req: Request) {

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

        // get param
        const { organizer_id, offset, take } = req.params

        try {
            // get data
            const eventData = await prisma.event.findMany({
                select: {
                    id: true,
                    event_name: true,
                    date: true,
                    capacity: true,
                    seat_available: true,
                    slug: true,
                    Transaction: {
                        select: {
                            id: true,
                            payment_status: true
                        },
                        where: {
                            payment_status: 'ACCEPT'
                        }
                    }
                },
                where: {
                    organizer_id: Number(organizer_id),
                },
                skip: Number(offset), // start get the data from skip+1
                take: Number(take) // take how many data
            })

            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched event Data",
                data: eventData,
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

    // get event data
    public async getEventDetails(req: Request) {
        const { slug } = req.params

        try {
            const data = await prisma.event.findUnique({
                where: {
                    slug: slug
                }
            })

            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched data success",
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

    // patch event data
    public async updateEvent(req: Request) {
        const { event_name, speaker, location, capacity, price, description } = req.body
        const { slug } = req.params


        try {

            await prisma.event.update({
                where: {
                    slug: slug
                },
                data: {
                    event_name: event_name,
                    speaker: speaker,
                    location: location,
                    capacity: Number(capacity),
                    price: Number(price),
                    description: description
                }
            })

            const data = await prisma.event.findUnique({
                where: {
                    slug: slug
                }
            })

            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched data success",
                data: data,
                code: 200
            }
            return feedback;

        } catch (error) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Fetched data failed",
                data: null,
                code: 200
            }
            return feedback;
        }


    }

    public async payment(req: Request): Promise<any> {
        try {
            const events = await prisma.event.findMany();
            return {
                status: statusEnum.SUCCESS,
                data: events
            };
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Unable to fetch events");
        }
    }

    public async searchEvent(req: Request): Promise<any> {
        const { query } = req.query;
        try {
            const events = await prisma.event.findMany({
                where: {
                    event_name: {
                        contains: String(query)
                    }
                }
            });
            return {
                status: statusEnum.SUCCESS,
                data: events
            };
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Unable to fetch events");
        }
    }

    public async eventDetail(req: Request): Promise<any> {
        const { id } = req.params;
        try {
            const events = await prisma.event.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return {
                status: statusEnum.SUCCESS,
                data: events
            };
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Unable to fetch events");
        }
    }

    // Get all events
    public async getAllEvents(): Promise<any> {
        try {
            const events = await prisma.event.findMany();
            return {
                status: statusEnum.SUCCESS,
                data: events
            };
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Unable to fetch events");
        }
    }

}

export default new EventService()
