import Vendor from "../../models/vendors/vendors.model.js"

export async function locationSetter(req, res) {

    try {
        const id = req.userId
        const city = req.body.city
        const state = req.body.state
        // const radius = parseFloat(req.query.radius) || 5000; // default radius is 5km


        const user = await Vendor.findById(id)

        if (!user)
            return res.status(401).send("Vendor does not exist.")
        
        const location = {city, state}

        const result = await Vendor.findOneAndUpdate( user._id, { currentLocation: location }, { new: true } )
         
        

        if (!result)
            return res.status(401).send("Something went wrong updating location.")

        return res.status(200).send({
            msg: "Location updated successfully!",
            location: {
                city: city,
                state: state
            }
        })


    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}
