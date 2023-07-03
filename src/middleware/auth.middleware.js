import jwt from "jsonwebtoken";
import { config } from "dotenv"

config();

export async function auth(req, res, next) {
    try {
        // access authorize header validation request
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodeToken;

        if (token && isCustomAuth) {
            // retrive the user details for the looged in user
            decodeToken = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decodeToken.userId;
            req.role = decodeToken.role
        } else {
            // retrive the user details for the looged in user
            decodeToken = jwt.decode(token);

            req.userId = decodeToken.sub;
        }
        next();

    } catch (error) {
        return res.status(401).send({ message: "Authentication failed", error: error });
    }
}
export async function localVariable(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
}
