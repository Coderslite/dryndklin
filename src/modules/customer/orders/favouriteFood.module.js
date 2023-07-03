import FavouriteFood from "../../../models/customers/favouriteFood.model.js";

export async function foodFavouriter(req, res) {

    try {
        
        const id = req.userId;
        const vendorId = req.params.vendorId;
        const vendorProductId = req.params.vendorProductId;

        const { error } = createOrderValidator(req.body);

        
        if (error) { 
            return res.status(400).send({ msg: error.details[0].message } )
        }
        
        const favouriteFood = new FavouriteFood({
            customerId: id,
            vendorId: vendorId,
            vendorProductId: vendorProductId
        });
       
        const result = await favouriteFood.save();;

        if (!result){
            return res.status(401).send({msg: "Something went wrong and favouriting food failed."})
        }

        return res.status(200).send({ msg: "Food favourited successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}