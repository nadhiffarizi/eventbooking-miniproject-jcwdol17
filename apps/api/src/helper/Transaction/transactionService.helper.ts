import { User } from "@prisma/client";
import { nodemailerUser } from "../../config"
import { hbs } from "../Email/handlebars"
import { transporter } from "../Email/nodemailer"
import { userLogin } from "../../interface/userAuthorize.interface";

interface IEvent {
    event_name: string,
    date: string,
    location: string
}

export const sendAcceptPayment = async (user: User, event: IEvent, amount: number) => {


    try {
        const compiledTemplate = hbs('acceptpayment.hbs');
        const html = compiledTemplate({
            event_name: event.event_name,
            name: user.first_name,
            date: event.date,
            location: event.location,
            amount: amount.toFixed(0),

        })

        transporter.sendMail({
            from: nodemailerUser,
            to: user.email,
            subject: "Payment Approved",
            html
        })
    } catch (error) {
        throw new Error("error sending accept payment email")
    }

}

export const sendRejectPayment = async (user: User, event: IEvent, amount: number) => {


    try {
        const compiledTemplate = hbs('rejectpayment.hbs');
        const html = compiledTemplate({
            event_name: event.event_name,
            name: user.first_name,
            date: event.date,
            location: event.location,
            amount: amount.toFixed(0),

        })

        transporter.sendMail({
            from: nodemailerUser,
            to: user.email,
            subject: "Payment Rejected",
            html
        })
    } catch (error) {
        throw new Error("error sending reject payment email")
    }

}