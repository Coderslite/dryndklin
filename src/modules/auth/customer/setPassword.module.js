import bcrypt from "bcrypt";
import User from "../../../models/customers/users.model.js";
import { passwordValidator } from "../../utils/validators/authValidator.module.js";
import { config } from "dotenv"
import { generate } from "otp-generator";

config();

export async function passwordSetter(req, res, next) {
   
    const {
        password, confirmPassword
    } = req.body;

    try {

        const id = req.userId;

        const { error } = passwordValidator(req.body);

        
        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(401).send("User does not exist.")
        }

        // Password confirmation
        if (password !== confirmPassword) {
            return res.status(400).send({ msg: "Passwords dosn't match." })
        }

        // Password hashing
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.findOneAndUpdate(user._id, { password: hashPassword }, { new: true });

        if (!result) {
            return res.status(401).send({msg: "Something went wrong and registrations failed."})
        }

        return res.status(200).send({
            result
        });


    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }

}