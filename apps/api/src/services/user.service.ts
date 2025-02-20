import { Request } from "express";
import { prisma } from "../config";
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { statusEnum } from "../helper/statusEnum.helper";
import { hashedPassword } from "../helper/bcrypt";
import { generateRandomString } from "ts-randomstring/lib";
import { sendEmailForgetPass } from "../helper/User/userService.helper";
import { cloudinaryUpload } from "../helper/cloudinary";
import { getUserByEmail } from "../helper/AuthService/authService.helper";
import { compare } from "bcrypt";

class UserService {

    // get user
    public async getUser(req: Request) {

        // the user has to be exist, if not cannot route to /api/user/profile

        const email = req.user?.email! as string
        const userData = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!userData) {
            console.log(userData);
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "Error server, cannot get data. Try again",
                data: null,
                code: 200
            }

            console.log(feedback);

            return feedback;

        } else {

            const feedback: serviceFeedback = {
                code: 200,
                data: {
                    "first_name": userData.first_name,
                    "last_name": userData.last_name,
                    "email": userData.email,
                    "referral_code": userData.referral_code,
                    "point_balance": userData.point_balance,
                    "point_expired_date": userData.point_expired_date ? (userData.point_expired_date.toISOString()) : null,
                    "coupon": userData.coupon,
                    "coupon_expired": userData.coupon_expired ? (userData.coupon_expired).toISOString() : null,

                },
                message: 'Get user data success',
                status: statusEnum.SUCCESS
            }
            return feedback
        }


    }

    // reset password
    public async resetPassword(req: Request) {
        // check if the user exist
        const { email } = req.body
        const userData = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(userData, email);

        if (!userData) {
            const feedback: serviceFeedback = {
                code: 404,
                data: null,
                message: 'account dont exist',
                status: statusEnum.FAILED
            }
            return feedback
        } else {
            const newPass = generateRandomString({
                length: 10
            })

            // update database
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    password: await hashedPassword(newPass, 10)
                }
            })

            // send email temporary password
            await sendEmailForgetPass(userData.first_name, email, newPass)

            // throw feedback
            const feedback: serviceFeedback = {
                code: 200,
                data: null,
                message: 'password has been reset successfully ',
                status: statusEnum.SUCCESS
            }
            return feedback
        }


    }

    // update image/avatar
    public async updateAvatar(req: Request) {
        const id = Number(req.user?.id);
        const { file } = req;
        if (!file) throw new Error("No File Uploaded");
        const { secure_url } = await cloudinaryUpload(file);
        await prisma.user.update({
            data: {
                image_url: secure_url,
            },
            where: {
                id,
            },
        });

        const feedback: serviceFeedback = {
            code: 200,
            data: secure_url,
            message: 'success upload avatar ',
            status: statusEnum.SUCCESS
        }
        return feedback
    }

    // update user data
    public async updateUser(req: Request) {
        const { first_name, last_name, current_password, new_password } = req.body
        const email = req.user?.email as string

        if (!first_name || !last_name) throw new Error("first_name and last_name must be completed")

        // only change first_name/last_name
        if (!current_password && !new_password) {
            // update profile data
            const userData = await prisma.user.update({
                where: {
                    email
                },
                data: {
                    first_name: first_name,
                    last_name: last_name,
                }
            })

            const feedback: serviceFeedback = {
                code: 200,
                data: null,
                message: 'updated user data, first name and last name ',
                status: statusEnum.SUCCESS
            }
            return feedback
        } else {
            // get user
            const userData = await getUserByEmail(email)

            // check password
            const currentPassCheck = await compare(current_password, userData?.password!)
            if (!currentPassCheck) {
                const feedback: serviceFeedback = {
                    code: 400,
                    data: { ...userData, currentPassCheck },
                    message: 'updating password: wrong current password ',
                    status: statusEnum.FAILED
                }
                return feedback
            } else {
                // update profile data
                await prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        first_name: first_name,
                        last_name: last_name,
                        password: await hashedPassword(new_password, 10)
                    }
                })

                const feedback: serviceFeedback = {
                    code: 200,
                    data: null,
                    message: 'updated user data and password',
                    status: statusEnum.SUCCESS
                }
                return feedback
            }
        }






    }
}

export default new UserService();