// Roles Authentication
export function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(401).send("Not Allowed")
        }
        next()
    }

}

// User Authenticity checker
export function authUser (req, res, next) {
    if (req.userId == null) {
        return res.status(403).send({result: req.user, msg: "You need to sign in"})
    }

    next()
}