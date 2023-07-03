import Mailgen from "mailgen"
import { config } from "dotenv"

config();

export const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: process.env.APP_NAME,
        link: process.env.APP_URL
    }
})