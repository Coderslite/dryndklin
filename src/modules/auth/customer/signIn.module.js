import bcrypt from "bcrypt";
import User from "../../../models/customers/users.model.js";
import { assignToken } from "../../utils/jwt.module.js";
import { userSignInWithEmailValidator, userSignInWithPhoneValidator } from "../../utils/validators/authValidator.module.js";

export async function signInWithEmail(req, res, next) {
    const { email } = req.body;

    const { error } = userSignInWithEmailValidator(req.body);
    if (error)
        return res.status(400).send({ msg: error.details[0].message })

    try {

        let existUser;
        
        // check if user exists with email
        if (req.body.email) existUser = await User.findOne({ email });

        // check if user registration completed
        if (existUser && (existUser.password == "")) return res.status(401).send({ msg: "User exists but registration not completed"})

        if (!existUser) return res.status(401).send({ msg: "User doesn't exist." })

        if (existUser.activityStatus !== true) {
            return res.status(403).send("Account is currently DEACTIVATED!")
        }


        const isPasswordCorrect = await bcrypt.compare(req.body.password, existUser.password);

        if (!isPasswordCorrect) return res.status(400).send({ msg: "Invalid credentials." })
        
        const token = assignToken({ userId: existUser._id, role: existUser.role });

        const { password, otp, __v, verifyPhone, verified, activityStatus, emailVerification, ...userDetails } = existUser._doc

        return res.status(200)
            .cookie("accessToken", token, {
                httpOnly: true
            })
            .send({
                result: userDetails,
                token: token
            });

    } catch (err) {
        return res.status(500).send({ err: err.message, msg: 'Something went wrong.' })
    }
}



export async function signInWithPhone(req, res, next) {
    const { phone } = req.body;

    const { error } = userSignInWithPhoneValidator(req.body);
    if (error)
        return res.status(400).send({ msg: error.details[0].message })

    try {

        let existUser;
        
        // check if user exists with phone
        if (req.body.phone) existUser = await User.findOne({ phone });

        // check if user registration completed
        if (existUser && (existUser.password == "")) return res.status(401).send({ msg: "User exists but registration not completed"})

        if (!existUser) return res.status(401).send({ msg: "User doesn't exist." })

        if (existUser.activityStatus !== true) {
            return res.status(403).send("Account is currently DEACTIVATED!")
        }


        const isPasswordCorrect = await bcrypt.compare(req.body.password, existUser.password);

        if (!isPasswordCorrect) return res.status(400).send({ msg: "Invalid credentials." })
        
        const token = assignToken({ userId: existUser._id, role: existUser.role });

        const { password, otp, __v, verifyPhone, verified, activityStatus, emailVerification, ...userDetails } = existUser._doc

        return res.status(200)
            .cookie("accessToken", token, {
                httpOnly: true
            })
            .send({
                result: userDetails,
                token: token
            });

    } catch (err) {
        return res.status(500).send({ err: err.message, msg: 'Something went wrong.' })
    }
}