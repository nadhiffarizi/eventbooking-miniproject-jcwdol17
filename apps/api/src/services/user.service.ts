import { Request } from "express";
import { prisma } from "../config";
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { statusEnum } from "../helper/statusEnum.helper";
import { hashedPassword } from "../helper/bcrypt";
import { generateRandomString } from "ts-randomstring/lib";
import { sendEmailForgetPass } from "../helper/User/userService.helper";
import { cloudinaryUpload } from "../helper/cloudinary";

class UserService {

    // get user
    public async getUser(req: Request) {

        // the user has to be exist, if not cannot route to /api/user/profile

        const { email } = req.body
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
                data: userData,
                message: 'Server',
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
                data: newPass,
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
}

export default new UserService();