import { dobAndPhoneValidator } from "../utils/validators/customerValidator.module"

const User = require("../../models/users.model")

export async function userUpdater(req, res) {
    const { phone, address } = req.body
    try {

        const id = req.body

        const { error } = dobAndPhoneValidator(req.body)
        if (error)
            return res.status(400).send({ msg: error.details[0].message })

        const user = await User.findById(id)

        if (!user)
            return res.status(401).send("User does not exist.")

        const result = await User.findOneAndUpdate( user._id, { dob, phone }, { new: true } )

        if (!result)
            return res.status(401).send("Something went wrong and registrations failed.")

        return res.status(200).send({
            msg: "Data updated successfully!"
        })

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


// updates date of birth and phone number
export async function dobAndPhoneUpdater(req, res) {
    const { dob, phone } = req.body

    try {

        const id = req.body

        const { error } = dobAndPhoneValidator(req.body)
        if (error) return res.status(400).send({ msg: error.details[0].message })

        const user = await User.findById(id)

        if (!user) return res.status(401).send("User does not exist.")

        const result = await User.findOneAndUpdate( user._id, { dob, phone }, { new: true } )

        if (!result) return res.status(401).send("Something went wrong and registrations failed.")

        return res.status(200).send({
            msg: "Data updated successfully!"
        })


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

