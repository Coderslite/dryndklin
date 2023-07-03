import { connect } from "mongoose";
import { config } from "dotenv"

// env config intialization
config();

export const Connection  = connect(process.env.MONGO_URL)
        .then(() => console.log("Connected to database successfully."))
        .catch((error) => console.log(error.message))
