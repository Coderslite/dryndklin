
import Joi from "joi";

export const dobAndEmailValidator = function validator(data) {
    const schema = Joi.object({
        dob: Joi.date().label("Date of Birth"),
        email: Joi.string().email().min(1).max(30).required().label("Full Name")
    });

    return schema.validate(data);
};
export const dobAndPhoneValidator = function validator(data) {
    const schema = Joi.object({
        dob: Joi.date().label("Date of Birth"),
        phone: Joi.number().required().label("Phone Number"),
    });

    return schema.validate(data);
};
export const brandInfoValidator = function validator(data) {
    const schema = Joi.object({
        brandName: Joi.string().required().label("Brand Name"),
        description: Joi.string().required().label("About"),
    });

    return schema.validate(data);
};
export const createOfficeValidator = function validator(data) {
    const schema = Joi.object({
        title: Joi.string().required().label("Office Title"),
        address: Joi.string().required().label("Office Address"),
    });

    return schema.validate(data);
};
export const createProductValidator = function validator(data) {
    const schema = Joi.object({
        images: Joi.array().required().label("Product Image(s)"),
        category: Joi.string().required().label("Category"),
        collections: Joi.string().required().label("Collection"),
        title: Joi.string().required().label("Food Title"),
        price: Joi.number().required().label("Food Price"),
        description: Joi.string().required().label("Food Description"),
    });

    return schema.validate(data);
};
export const createStaffValidator = function validator(data) {
    const schema = Joi.object({
        fullName: Joi.string().required().label("fullName"),
        phone: Joi.string().required().label("Phone"),
        email: Joi.string().email().required().label("email"),
        documentType: Joi.string().required().label("Document Type"),
        role: Joi.string().required().label("Role"),
        documentTypeImageProof: Joi.array().required().label("Document Type Image(s)"),
        accountDetailsImageProof: Joi.array().required().label("Account Details Image(s)"),
    });

    return schema.validate(data);
};