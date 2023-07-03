import User from "../../models/customers/users.model.js";
import { createOfficeValidator } from "../utils/validators/vendorValidator.module.js";

export async function officeCreator(req, res) {

    try {

        const id = req.userId;
        const { error } = createOfficeValidator(req.body);

        
        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const user = await User.findById(id)

        if (!user)
            return res.status(401).send("User does not exist.")

        const newAddress = {title: req.body.title, address: req.body.address}

        user.addresses.push(newAddress)

        const result = user.save()

        if (!result){
            return res.status(401).send({msg: "Something went wrong and office adding failed."})
        }

        return res.status(200).send({ msg: "Office added successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }

}