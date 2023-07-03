
import Topping from "../../../models/vendors/toppings.mode.js";
import { toppingsValidator } from "../../utils/validators/orderValidator.module.js";


export async function toppingsCreator(req, res) {

    const {
        images, category, collection, title, price, description
    } = req.body;

    try {
        
        const id = req.userId;
        const { error } = toppingsValidator(req.body);

        
        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const toppings = new Topping({
            vendorId: id,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        });
       
        const result = await toppings.save();;

        if (!result){
            return res.status(401).send({msg: "Something went wrong and toppings creation failed."})
        }

        return res.status(200).send({ msg: "Toppings Created successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
    
    }

}