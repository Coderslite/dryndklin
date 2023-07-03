
import Joi from "joi";

export const userSignUpWithEmailValidator = function validator(data) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(120).label("Email"),        
    });
    return schema.validate(data);
};

export const updateUserDetailsValidator = function validator(data) {
    const schema = Joi.object({
        surname: Joi.string().min(1).max(30).required().label("Surname"),
        firstName: Joi.string().min(1).max(30).required().label("firstName"),
        gender: Joi.string().min(1).max(7).required().label("gender"),
        countryCode: Joi.string().min(1).max(8).required().label("countryCode"),
        phone: Joi.string().min(1).max(15).required().label("phone"),
        city: Joi.string().min(1).max(17).required().label("city"),
        state: Joi.string().min(1).max(15).required().label("state"),
        country: Joi.string().min(1).max(15).required().label("country"),
        password: Joi.string().min(1).max(30).required().label("password"),
        confirmPassword: Joi.string().min(1).max(30).required().label("confirmPassword"),
        referralCode: Joi.string().min(4).max(4).label("referralCode"),
    });

    return schema.validate(data);
};

export const userSignInValidator = function validator(data) {
    const schema = Joi.object({
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).max(20).required().label("Password")
    });

    return schema.validate(data);
};

export const userSignInWithEmailValidator = function validator(data) {
    const schema = Joi.object({
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).max(20).required().label("Password")
    });

    return schema.validate(data);
};

export const userSignInWithPhoneValidator = function validator(data) {
    const schema = Joi.object({
        phone: Joi.number().required().label("Phone"),
        password: Joi.string().min(6).max(20).required().label("Password")
    });

    return schema.validate(data);
};
export const vendorSignInWithEmailValidator = function validator(data) {
    const schema = Joi.object({
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).max(20).required().label("Password")
    });

    return schema.validate(data);
};

export const vendorSignInWithPhoneValidator = function validator(data) {
    const schema = Joi.object({
        phone: Joi.number().required().label("Phone"),
        password: Joi.string().min(6).max(20).required().label("Password")
    });

    return schema.validate(data);
};

export const passwordValidator = function validator(data) {
    const schema = Joi.object({
        password: Joi.string().required().min(6).max(20).label("Password"),
        confirmPassword: Joi.string().min(6).max(20).required().label("Confirm Password")
    });

    return schema.validate(data);
};