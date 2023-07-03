
import Product from "../../../models/vendors/products.model.js";
import { createProductValidator } from "../../utils/validators/vendorValidator.module.js";


export async function productCreator(req, res) {

    const {
        images, category, collection, title, price, description
    } = req.body;

    try {
        
        const id = req.userId;
        const { error } = createProductValidator(req.body);

        
        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const product = new Product({
            vendorId: id,
            images: req.body.images,
            category: req.body.category,
            collections: req.body.collections,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        });
       
        const result = await product.save();;

        if (!result){
            return res.status(401).send({msg: "Something went wrong and product creation failed."})
        }

        return res.status(200).send({ msg: "Product Created successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
        
    }

}
