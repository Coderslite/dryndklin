import User from "../../models/customers/users.model.js"
// import { createError } from "../utils/createError.module.js";

export async function customerDeleter(req, res) {    
    
    await User.findByIdAndDelete(req.userId)


    return res.status(200).send({ msg:"User deleted successfully."})
}