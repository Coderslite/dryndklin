
import Joi from "joi";

export const dobAndEmailValidator = function validator(data) {
    const schema = Joi.object({
        dob: Joi.string().label("Date of Birth"),
        email: Joi.string().email().min(1).max(30).required().label("Full Name")
    });

    return schema.validate(data);
};
export const dobAndPhoneValidator = function validator(data) {
    const schema = Joi.object({
        dob: Joi.string().label("Date of Birth"),
        phone: Joi.number().required().label("Phone Number"),
    });

    return schema.validate(data);
};

export const createOrderValidator = function validator(data) {
    const schema = Joi.object({
        distance: Joi.number().required().label("Distance"),
        quantity: Joi.number().required().label("Quantity"),
        description: Joi.string().required().label("Description"),
        modeOfDelivery: Joi.string().label("Mode of Delivery"),
        toppings: Joi.object().label("Toppings"),
        beverages: Joi.object().label("Beverages"),
        price: Joi.number().required().label("Price"),
        totalPrice: Joi.number().required().label("Total Price"),
        vat: Joi.number().required().label("VAT Fee"),
        deliveryFee: Joi.number().label("Delivery Fee"),
    });

    return schema.validate(data);
};