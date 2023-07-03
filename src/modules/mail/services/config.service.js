import Mailjet from "node-mailjet"
import { config } from "dotenv"

config();

export const mailjet = new Mailjet({
    apiKey: "f2482c1de00a92f52f21418123bf8daf",
    apiSecret: "79218906f3687add723c5c1b27106d10",
});