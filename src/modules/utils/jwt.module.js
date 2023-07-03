import jwt from "jsonwebtoken"
import { config } from "dotenv"

config();

export function assignToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" })
}
export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: "12h" })
}