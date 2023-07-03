
import { config } from "dotenv"
import { brandInfoValidator } from "../utils/validators/vendorValidator.module.js";
import Vendor from "../../models/vendors/vendors.model.js";


config();

export async function brandAndAboutSetter(req, res, next) {

    const {
        brandName, description
    } = req.body;

    try {

        const id = req.userId;
        const { error } = brandInfoValidator(req.body);

        
        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const vendor = await Vendor.findById(id);
        if (!vendor) {
            return res.status(401).send("Vendor does not exist.")
        }
       
        const result = await Vendor.findOneAndUpdate(vendor._id, { brandName, description }, { new: true });

        if (!result){
            return res.status(401).send({msg: "Something went wrong and registrations failed."})
        }

        return res.status(200).send({ msg: "Updated successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
        
    }

}