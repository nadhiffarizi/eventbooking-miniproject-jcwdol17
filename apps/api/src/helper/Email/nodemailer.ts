import nodemailer from "nodemailer"
import { nodemailerPass, nodemailerUser } from "../../config"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: nodemailerUser,
        pass: nodemailerPass
    }
})