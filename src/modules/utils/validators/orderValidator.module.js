import Joi from "joi";

export const orderItemsValidator = function validator(data) {
    const schema = Joi.object({
        customerId: Joi.object().required().label("Customer Id"),
        vendorId: Joi.object().required().label("Vendor Id"),
        distance: Joi.string().min(1).required().label("Distance"),
        quantity: Joi.number().min(1).required().label("Quantity"),
        ratings: Joi.number().min(1).label("Ratings"),
        description: Joi.string().min(1).required().label("Description"),
        modeOfDelivery: Joi.string().min(1).label("Mode of Delivery"),
        toppings: Joi.array().label("Toppings"),
        beverages: Joi.array().label("Beverages"),
        price: Joi.number().required().label("Price"),
        totalPrice: Joi.number().required().label("Total Price"),
        vat: Joi.number().required().label("VAT Price"),
        deliveryPrice: Joi.number().label("Delivery Price"),
        status: Joi.string().required().label("Status")
    });

    return schema.validate(data);
};

export const toppingsValidator = function validator(data) {
    const schema = Joi.object({
        vendorId: Joi.object().required().label("Vendor Id"),
        name: Joi.string().required().label("Toppings name"),
        price: Joi.number().required().min(1).label("Price"),
        quantity: Joi.number().required().min(1).label("Quantity"),
    });

    return schema.validate(data);
};

export const beveragesValidator = function validator(data) {
    const schema = Joi.object({
        vendorId: Joi.object().required().label("Vendor Id"),
        name: Joi.string().required().label("Beverages name"),
        price: Joi.number().required().min(1).label("Price"),
        quantity: Joi.number().required().min(1).label("Quantity"),
    });

    return schema.validate(data);
};