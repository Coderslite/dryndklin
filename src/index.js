import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { config } from "dotenv"
import session from "express-session"
import customerAuthRouter from "./routes/auth/customerAuth.route.js"

// Database Connection
import { Connection } from "./database/conn.js"
import { auth } from "./middleware/auth.middleware.js"
import { createError } from "./modules/utils/createError.module.js"
import passport from "passport"
import "./config/passport.js"

// env config intialization
config();


const app = express();
const port = process.env.PORT 

console.log(port);

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.disable('x-powered-by') // Prevents Hacker from knowing our stacks


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}





app.use('/api/users', auth, (req, res) => {
    console.log("lalkdjfs");
    return res.status(200).send({ message: "Michael King, signing in successful"})
})

app.use("/api/auth/customer", customerAuthRouter)



// app.get('/auth/google/failure', (req, res) => {
//     return res.send("Something went wrong!"); 
// })


// app.get('/auth/google/protected', isLoggedIn, (req, res) => {
//     let name = req.user.displayName;

//     return res.send(`Hello guyes! ${name}`); 
// })



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).send(errorMessage)
    
})


app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})