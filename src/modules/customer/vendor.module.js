import User from "../../models/customers/users.model"
import Vendor from "../../models/vendors/vendors.model"

// Get all Vendors
export async function vendorGetter(req, res) {

    try {

        const user = await User.findById(id)

        const userLocation = user.currentLocation

        if (!user)
            return res.status(401).send("User does not exist.")

        const result = await Vendor.findById.findOneAndUpdate( user._id, { dob, phone }, { new: true } )

        if (!result)
            return res.status(401).send("Something went wrong and registrations failed.")

        return res.status(200).send({
            msg: "Data updated successfully!"
        })


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}
