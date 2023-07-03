import { createError } from "../../utils/createError.module"

export async function sessionResetter(req, res, next) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false // allow access to this route only once
        return res.status(201).send({ mst: "access granted" })
    }
    next(createError(440, { msg: "Session expired!" }))
}