import geolib from "geolib"
import User from "../../models/customers/users.model.js"
import Vendor from "../../models/vendors/vendors.model.js"


export async function locationSetter(req, res) {

    try {
        const id = req.userId
        const city = req.body.city
        const state = req.body.state
        // const radius = parseFloat(req.query.radius) || 5000; // default radius is 5km


        const user = await User.findById(id)

        if (!user)
            return res.status(401).send("User does not exist.")
        
        const location = {city, state}

        const result = await User.findOneAndUpdate( user._id, { currentLocation: location }, { new: true } )
         
        

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
        return res.status(500).send({ msg: error.message })
    }
}

export async function closestVendorGetter(req, res) {

    try {
        const customerId = req.userId

        const customer = await User.findById(customerId)
        if (!customer) return res.status(404).send({ error: "Customer not found!" })

        // const { latitude, longitude } = req.query; // User's location

        // Query MongoDB for all vendors in the given state and city
        const vendors = await Vendor.find({ 'currentLocation.city': customer.currentLocation.city, 'currentLocation.state': customer.currentLocation.state })

        // Calculate distance between user's location and each vendor
        // vendors.forEach(vendor => {
        //     vendor.distance = geolib.getDistance(
        //     { latitude: vendor.latitude, longitude: vendor.longitude },
        //     { latitude, longitude }
        //     );
        // });

        // Sort vendors by distance and return the sorted list
        const sortedVendors = vendors.sort((a, b) => a.distance - b.distance);
        
        return res.send(sortedVendors)
    } catch (err) {
        
    }

    // try {

    //     const customerId = req.userId
    //     const maxDistance = req.query.maxDistance || 5000; // Default to 5km

    //     const customer = await User.findById(customerId);
    //     // if (!customer) return res.status(404).send({ error: "Customer not found!" })

    //     // const vendors = await Vendor.find({
    //     //     coordinates: {
    //     //         $nearSphere: {
    //     //             $geometry: customer.currentLocation,
    //     //             $maxDistance: maxDistance
    //     //         }
    //     //     }
    //     // })

    //     /////////////////////////////////
    //     // const lng = 154.76567
    //     // const lat = 4.8689
    //     // // const radius = req.query.radius || 5000 // default radius is 5km
    //     // const vendorCoordinates = [parseFloat(lng), parseFloat(lat)];
    //     // const maxDistance = req.query.maxDistance || 5000; // Default to 5km

    //     // if (isNaN(lat) || isNaN(lng)) {
    //     //     return res.status(400).send({ error: 'Invalid location' });
    //     // }

    //     // const result = await Vendor.find({
    //     //     coordinates: {
    //     //         $nearSphere: {
    //     //             $geometry: {
    //     //               type: 'Point',
    //     //               coordinates: vendorCoordinates
    //     //             },
    //     //             $maxDistance: maxDistance
    //     //           }
    //     //     }
    //     // })

    //     // if (!vendors) return res.status(500).send({error: "Server Error"})

    //     // if (vendors) return res.status(200).send({foodVendors: vendors})


    // } catch (error) {
    //     return res.status(500).send({ msg: error.message })
    // }
}



export async function closestFoodGetter(req, res) {

    try {
        const customerId = req.userId

        const customer = await User.findById(customerId)
        if (!customer) return res.status(404).send({ error: "Customer not found!" })

        // const { latitude, longitude } = req.query; // User's location

        // Query MongoDB for all vendors in the given state and city
        const vendors = await User.find({ 'currentLocation.city': customer.currentLocation.city, 'currentLocation.state': customer.currentLocation.state })

        // Calculate distance between user's location and each vendor
        // vendors.forEach(vendor => {
        //     vendor.distance = geolib.getDistance(
        //     { latitude: vendor.latitude, longitude: vendor.longitude },
        //     { latitude, longitude }
        //     );
        // });

        // Sort vendors by distance and return the sorted list
        const sortedVendors = vendors.sort((a, b) => a.distance - b.distance);

        const { password, otp, __v, verifyPhone, verified, activityStatus, emailVerification, ...vendorDetails } = sortedVendors._doc
        
        return res.send(vendorDetails)
    } catch (err) {
        
    }
}