import { ROLE } from "../../../data/roles.data.js";
import User from "../../../models/customers/users.model.js";
import { OTPSender } from "../../mail/sendOTP.module.js";
import { welcomeMessageSender } from "../../mail/welcomeMail.module.js";
import { assignToken } from "../../utils/jwt.module.js";
import bcrypt from "bcrypt";
import { updateUserDetailsValidator, userSignUpWithEmailValidator } from "../../utils/validators/authValidator.module.js";
import { config } from "dotenv";
import otpGenerator from "otp-generator";


// env config intialization
config();

export async function signUpWithEmail(req, res, next) {
    // Verify if email exists
    const {
        email
    } = req.body;

    try {

        let token

        const { error } = userSignUpWithEmailValidator(req.body);
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        
        const userExistence = await User.findOne({ email });

        if (userExistence && userExistence.password !== "" && userExistence.verified === true) {        
            return res.status(401).send({msg: "User already existed."})
        }

        if (userExistence && userExistence.password !== "" && userExistence.verified === false)      
            return res.status(401).send({msg: "User already existed but register verification not completed yet!."})
        
        if(userExistence) {
            token = assignToken({ userId: userExistence.id, role: userExistence.role });

            return res.status(401)
            .cookie("accessToken", token, {
                httpOnly: true
            }).send({
                msg: "User already exist",
                token: token
            });
        }

        if (userExistence && userExistence.password === "" && userExistence.verified === false ) {        
            token = assignToken({ userId: userExistence.id, role: userExistence.role });
            return res.status(200)
                .cookie("accessToken", token, {
                    httpOnly: true
                })
                .send({
                    msg : "Proceed with registration",
                    token: token
                });
        }


        const newUser = new User({
            email,
            addresses: [],
            role: ROLE.CUSTOMER
        });
        
        const result = await newUser.save();

        try {
            if (!newUser)
                return res.status(401).send({msg: "Something went wrong and registrations failed."})


            // Check if data not saved into the database
            if (!result)
                return res.status(400).send({msg: "Something went wrong."})

            // Assign token to User
            token = assignToken({ userId: newUser.id, role: ROLE.CUSTOMER });

            welcomeMessageSender(email, ROLE.CUSTOMER)


            return res.status(200)
                .cookie("accessToken", token, {
                    httpOnly: true
                })
                .send({
                    result,
                    token: token
                });

                
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }

        

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}



export async function customerDetailsUpdator(req, res, next) {
    const { surname, firstName, gender, countryCode, phone, city, state, country, password, confirmPassword, referralCode } = req.body;

    const id = req.userId;

    const { error } = updateUserDetailsValidator(req.body);

    
    if (error) {
        return res.status(400).send({ msg: error.details[0].message } )
    }

    // Password confirmation
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({ msg: "Passwords dosn't match." })
    }

    
    
    try {

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).send("User does not exist.")
        }

        // Password hashing
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Generate a 4-digit OTP code
        const otp = Math.floor(1000 + Math.random() * 9000);
        // const inviteCode = otpGenerator.generate(6, { specialChars: false });
        // Invite Code Generator
       
        if (!user) return res.status(401).send({ msg: "User doesn't exist." })

        // if (user.activityStatus !== true) return res.status(403).send("Account is currently DEACTIVATED!")


        const result = await User.findOneAndUpdate( user._id, { 
            surname: surname, 
            firstName: firstName, 
            gender: gender, 
            countryCode: countryCode, 
            phone: phone, 
            city: city, 
            state: state, 
            country: country, 
            password: hashPassword,
            otp: otp,
            // inviteCode: inviteCode,
            referralCode: referralCode,
        }, { new: true })


        if(!result) return res.status(401).send({msg: "OTP sending failed!"})

        // Save the OTP in the database or cache, associated with the customer's email address          
        OTPSender(user.email, firstName, otp)
        
        // const token = assignToken({ userId: user._id, role: user.role });
        const { password,  __v, verifyPhone, verified, activityStatus, emailVerification, ...userDetails } = user._doc

        return res.status(200)
            .send({
                result: userDetails,
                // token: token
            });

    } catch (err) {
        return res.status(500).send({ err: err.message, msg: 'Something went wrong.' })
    }
}
