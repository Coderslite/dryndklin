
import Beverage from "../../../models/vendors/beverages.model.js";
import { beveragesValidator } from "../../utils/validators/orderValidator.module.js";


export async function beveragesCreator(req, res) {

    try {
        
        const id = req.userId;
        const { error } = beveragesValidator(req.body);

        
        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const beverages = new Beverage({
            vendorId: id,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        });
       
        const result = await beverages.save();;

        if (!result){
            return res.status(401).send({msg: "Something went wrong and beverages creation failed."})
        }

        return res.status(200).send({ msg: "Beverages Created successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
        // 
    }

}