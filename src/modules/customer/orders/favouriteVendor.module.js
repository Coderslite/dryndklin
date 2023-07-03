import FavouriteVendor from "../../../models/customers/favouriteVendor.model.js";

export async function vendorFavouriter(req, res) {

    try {
        
        const cutomerId = req.userId;
        const vendorId = req.params.vendorId;

        const { error } = createOrderValidator(req.body);

        
        if (error) { 
            return res.status(400).send({ msg: error.details[0].message } )
        }
        
        const favouriteVendor = new FavouriteVendor({
            customerId: cutomerId,
            vendorId: vendorId
        });
       
        const result = await favouriteVendor.save();;

        if (!result){
            return res.status(401).send({msg: "Something went wrong and favouriting food failed."})
        }

        return res.status(200).send({ msg: "Food favourited successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}