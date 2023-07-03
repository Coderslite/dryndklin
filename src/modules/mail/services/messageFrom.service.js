import { config } from "dotenv"

config();


export const MailSender = {
    "Email": process.env.MAIL_EMAIL,
    "Name": process.env.MAIL_NAME
}