import otpGenerator from "otp-generator";
import User from "../../models/customers/users.model.js";
import { OTPSender } from "../mail/sendOTP.module.js";
import { otpSenderValidator, otpVerifierValidator } from "./validators/otpValidator.module.js";

export async function customerOTPGenerator(req, res) {
    const { email,  } = req.body;

    try {
        const { error } = otpSenderValidator(req.body);
        if (error)
            return res.status(400).send({ msg: error.details[0].message })

        // Generate a 4-digit OTP code
        const otp = Math.floor(1000 + Math.random() * 9000);
        if(email) {
            const customer = await User.findOne({ email });

            if (!customer)  return res.status(401).send({msg: "Customer does not exist!"})

            // Save the OTP in the database or cache, associated with the customer's email address
            const result = await User.findOneAndUpdate( customer._id, { otp: otp }, { new: true })

            if(!result) return res.status(401).send({msg: "OTP sending failed!"})
            
            OTPSender(email, customer.fullName, otp)

            return res.status(200).send({code: otp})
        }
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong", error: error.message })
    }

}

export async function vendorOTPGenerator(req, res) {
    const { email, phone } = req.body;

    try {
        const { error } = otpSenderValidator(req.body);
        if (error)
            return res.status(400).send({ msg: error.details[0].message })

        // Generate a 4-digit OTP code
        const otp = Math.floor(1000 + Math.random() * 9000);
        if(email) {
            const vendor = await Vendor.findOne({ email });
            
            if (!vendor)  return res.status(401).send({msg: "Vendor does not exist!"})

            // Save the OTP in the database or cache, associated with the vendor's email address
            const result = await Vendor.findOneAndUpdate( vendor._id, { otp: otp }, { new: true })

            if(!result) return res.status(401).send({msg: "OTP sending failed!"})
            
            OTPSender(email, vendor.fullName, otp)

            return res.status(200).send({code: otp})
        }
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong", error: error.message })
    }

}

export async function customerOTPVerifer(req, res) {

    const { code } = req.body
    const id = req.userId;

    try {
        const { error } = otpVerifierValidator(req.body);

        if (error)
            return res.status(400).send({ msg: error.details[0].message })

            const customer = await User.findById(id);
            
            if (!customer) return res.status(401).send({msg: "Customer does not exist!"})

            if ( customer.otp === "" )  return res.status(401).send({msg: "OTP does not exist!"})

           if (code != customer.otp) return res.status(401).send({msg: "OTP did not match!", status: false })
  

           if (code === customer.otp) {
            
            const inviteCode = otpGenerator.generate(8, { specialChars: false });

                await User.findOneAndUpdate( customer._id, { activityStatus: true,  emailVerification: true, inviteCode: inviteCode }, { new: true })

                const { password,  __v, activityStatus, emailVerification, ...userDetails } = customer._doc;

                return res.status(200).send({
                    msg: "Verification successful!",
                    status: true,
                    result: userDetails,

                })
           } 
        
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong", error: error.message })
    }
    
}

export async function vendorOTPVerifer(req, res) {

    const { email, phone, code } = req.body
        
    try {
        const { error } = otpVerifierValidator(req.body);
        if (error)
            return res.status(400).send({ msg: error.details[0].message })

        if( email ) {
            const vendor = await Vendor.findOne({ email });
            
            if (!vendor) return res.status(401).send({msg: "Vendor does not exist!"})

            if ( vendor.otp === "" )  return res.status(401).send({msg: "OTP does not exist!"})

           if (code != vendor.otp) return res.status(401).send({msg: "OTP did not match!", status: false })

           
           if (code === vendor.otp) {
                
                let referralCode;
                const codeGenerator = generate(8, { lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: false })

                referralCode = codeGenerator

                const checkReferralCodeExistence = await Vendor.findOne({ referralCode })

                if (checkReferralCodeExistence && referralCode === checkReferralCodeExistence.referralCode) referralCode = codeGenerator
                

                while (checkReferralCodeExistence && referralCode === checkReferralCodeExistence.referralCode) referralCode = codeGenerator

                await Vendor.findOneAndUpdate( vendor._id, { activityStatus: true, verified: true, emailVerification: true, referralCode: referralCode }, { new: true })

                return res.status(200).send({
                    msg: "Verification successful!",
                    status: true
                })
           }
        }
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong", error: error.message })
    }
}