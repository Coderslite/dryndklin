import Mailjet from "node-mailjet"
import { config } from "dotenv"

config();

export const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
});