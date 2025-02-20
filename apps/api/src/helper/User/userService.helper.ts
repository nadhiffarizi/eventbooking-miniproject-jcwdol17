import { nodemailerUser } from "../../config"
import { hbs } from "../Email/handlebars"
import { transporter } from "../Email/nodemailer"

export const sendEmailForgetPass = async (firstName: string, emailUser: string, newPass: string) => {

    try {
        const compiledTemplate = hbs('forgetpassword.hbs');
        const html = compiledTemplate({
            name: firstName,
            password: newPass
        })

        transporter.sendMail({
            from: nodemailerUser,
            to: emailUser,
            subject: "Your temporary password",
            html
        })

    } catch (error) {
        throw new Error("error sending forgot pass email")
    }

}