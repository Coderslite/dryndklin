import User from "../../../models/customers/users.model.js";
import { genSalt, hash } from "bcrypt";
import { config } from "dotenv"

config();

export async function passwordResetter(req, res) {

    try {
        if (!req.app.locals.resetSession)
            return res.status(440).send({ error: "Session expired!" });
        
        const id = req.userId;
        const { password } = req.body;

        try {
            const user = await User.findById(id);
            if (!user)
                return res.status(401).send({ error: "User not found in records" });

            // Password hashing
            const salt = genSalt(process.env.SALT);
            const hashPassword = hash(password, salt);

            const updatePassword = User.updateOne( user._id, { password: hashPassword });

            if (!updatePassword)
                return res.status(401).sent({ msg: "Update failed, somehting went wrong." });

            return res.status(201).send({ msg: "Password Updated...!", data: updatePassword });

        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(500).send({ error });
    }

}