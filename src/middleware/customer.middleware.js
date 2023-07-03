import { ROLE } from "../data/roles.data.js";
// import { createError } from "../modules/utils/createError.module.js";

export async function customer(req, res, next) {
    if (req.role !== ROLE.CUSTOMER) {
        return res.status(403).send("Access denied, only Customers allowed")
    }
    next()
}