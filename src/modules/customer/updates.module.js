import User from "../../models/customers/users.model.js"
import { dobAndEmailValidator, dobAndPhoneValidator } from "../../modules/utils/validators/customerValidator.module.js"

// updates date of birth and email
export async function dobAndEmailUpdater(req, res) {
    const { dob, email } = req.body

    try {

        const { id } = req.userId
        const { error } = dobAndEmailValidator(req.body)
        if (error)
            return res.status(400).send({ msg: error.details[0].message })

        const checkEmailExistence = await User.findOne({ email }).where("email").equals(email)
        if (checkEmailExistence) {
            return res.status(401).send({ msg: "Email already existed." })
        }

        const user = await User.findById(id)

        if (!user)
            return res.status(401).send("User does not exist.")

        const result = await User.findOneAndUpdate( user._id, { dob, email }, { new: true } )

        if (!result)
            return res.status(401).send("Something went wrong and registrations failed.")

            return res.status(200).send({
            msg: "Email updated successfully!"
        })


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


// updates date of birth and phone number
export async function dobAndPhoneUpdater(req, res) {
    const { dob, phone } = req.body

    try {

        const id = req.userId

        const { error } = dobAndPhoneValidator(req.body)
        if (error)
            return res.status(400).send({ msg: error.details[0].message })

        const checkPhoneNumberExistence = await User.findOne({ phone }).where("phone").equals(phone)
        if (checkPhoneNumberExistence) {
            return res.status(401).send({ msg: "User with phone number already existed." })
        }

        const user = await User.findById(id)

        if (!user)
            return res.status(401).send("User does not exist.")

        const result = await User.findOneAndUpdate( user._id, { dob, phone }, { new: true } )

        if (!result)
            return res.status(401).send("Something went wrong and registrations failed.")

        return res.status(200).send({
            msg: "Phone number updated successfully!"
        })


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}