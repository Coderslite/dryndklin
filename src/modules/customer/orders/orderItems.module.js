
import Order from "../../../models/customers/orders.model.js";
import User from "../../../models/customers/users.model.js";
import Beverage from "../../../models/vendors/beverages.model.js";
import Product from "../../../models/vendors/products.model.js";
import Topping from "../../../models/vendors/toppings.mode.js";
import Vendor from "../../../models/vendors/vendors.model.js";
import { createOrderValidator } from "../../utils/validators/customerValidator.module.js";


export async function allOrderedItemsGetter(req, res) {
    try {
        const customerId = req.userId
          
        const allOrders = await Order.find({customerId: customerId})

        if (!allOrders) return res.status(401).send("Order not found")

        return res.status(200).send(allOrders)
    } catch (err) {
        return res.send(err)
    }
}


export async function orderBooker(req, res) {

    const {
        category, collection, title, price, description
    } = req.body;

    try {
        
        const id = req.userId;
        const vendorId = req.params.vendorId;
        const vendorProductId = req.params.vendorProductId;

        const { error } = createOrderValidator(req.body);

        
        if (error) { 
            return res.status(400).send({ msg: error.details[0].message } )
        }
        
        const order = new Order({
            customerId: id,
            vendorId: vendorId,
            vendorProductId: vendorProductId,
            distance: req.body.distance,
            quantity: req.body.quantity,
            description: req.body.description,
            modeOfDelivery: req.body.modeOfDelivery,
            toppings: req.body.toppings,
            beverages: req.body.beverages,
            price: req.body.price,
            totalPrice: req.body.totalPrice,
            vat: req.body.vat,
        });
       
        const result = await order.save();;

        if (!result){
            return res.status(401).send({msg: "Something went wrong and order booking failed."})
        }

        return res.status(200).send({ msg: "Order sent successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

export async function singleOrderedItemGetter(req, res) {
    try {
        const customerId = req.userId
        const orderId = req.params.orderId

        const order = await Order.findById(orderId).where("customerId").equals(customerId)
        
        if (!order) return res.status(401).send("Order not found")

        return res.status(200).send(order)
    } catch (err) {
        return res.send(err)
    }
}

export async function vendorProductDetailsGetter(req, res) {
    try {
        const vendorId = req.params.vendorId
        const productId = req.params.productId

        const order = await Product.findById(productId).where("vendorId").equals(vendorId)
        
        if (!order) return res.status(401).send("Product not found")

        return res.status(200).send(order)
    } catch (err) {
        return res.send(err)
    }
}

export async function toppingsDetailsGetter(req, res) {
    try {
        const vendorId = req.params.vendorId
        const toppingsId = req.params.toppingsId

        const order = await Topping.findById(toppingsId).where("vendorId").equals(vendorId)
        
        if (!order) return res.status(401).send("Toppings not found")

        return res.status(200).send(order)
    } catch (err) {
        return res.send(err)
    }
}

export async function beveragesDetailsGetter(req, res) {
    try {
        const vendorId = req.params.vendorId
        const beveragesId = req.params.beveragesId

        const order = await Beverage.findById(beveragesId).where("vendorId").equals(vendorId)
        
        if (!order) return res.status(401).send("Beverages not found")

        return res.status(200).send(order)
    } catch (err) {
        return res.send(err)
    }
}

export async function vendorDetailsGetter(req, res) {
    try {
        const vendorId = req.params.vendorId

        const vendor = await Vendor.findById(vendorId)
        
        if (!vendor) return res.status(401).send("Vendor not found")

        const { password, otp, __v, verifyPhone, verified, activityStatus, emailVerification, ...vendorDetails } = vendor._doc

        return res.status(200).send(vendorDetails)
    } catch (err) {
        return res.send(err)
    }
}

export async function customerDetailsGetter(req, res) {
    try {
        const customerId = req.userId

        const customer = await User.findById(customerId)
        
        if (!customer) return res.status(401).send("Customer not found")

        const { password, otp, __v, verifyPhone, verified, activityStatus, emailVerification, ...customerDetails } = customer._doc

        return res.status(200).send(customerDetails)
    } catch (err) {
        return res.send(err)
    }
}