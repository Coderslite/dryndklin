import { verifyToken } from "../modules/utils/jwt.module.js";
import User from "../models/customers/users.model.js";
// import Vendor from "../models/laundry/laundry.model.js";
// import { createError } from "../modules/utils/createError.module.js";

export async function customerVerifier (req, res, next) {

    const user = await User.findById(req.userId)

    const token = req.cookies.accessToken;
    if (!token) return next(401, "You are not authorized!")

    const decode = verifyToken(token)
    
    if (!user) return res.status(401).send({msg: "You have to sign up first, Not authorized"})

    if ( decode.userId !== user._id.toString() ) {
        return res.status(401).send("You can only modify your own account!")
    }
    
    next()

}


export async function vendorVerifier (req, res, next) {

        const vendor = await Vendor.findById(req.userId)

        const token = req.cookies.accessToken;
        if (!token) return next(401, "You are not authorized!")

        const decode = verifyToken(token)

        if (!vendor) return res.status(401).send({msg: "You have to sign up first, Not authorized"})

        if ( decode.vendorId !== vendor._id.toString() ) {
            return res.status(401).send("You can only modify your own account!")
        }

        next()

}

// export const verifyToken = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).send("You are not authorized!");
    
//     jwt.verify(token, JWT_SECRET, { expiresIn: "12h" }, async (err, payload) => {
//         if (err) return res.status(403).send("Toke is not valid ")

//         req.userId = payload.id
//         req.role = payload.role
//     })
// }
