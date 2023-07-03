import Joi from "joi";

export const otpSenderValidator = function validator(data) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(120).label("Email"),
        phone: Joi.number().label("Phone Number")
    });

    return schema.validate(data);
};

export const otpVerifierValidator = function validator(data) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(120).label("Email"),
        code: Joi.number().required().label("OTP Code")
    });

    return schema.validate(data);
};