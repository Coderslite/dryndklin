import mongoose from "mongoose";
import { userData } from "../../data/auth/customer.data.js";
import { timestamp } from "../../data/timestamp.data.js";

const userSchema = new mongoose.Schema(userData, timestamp)

const User = mongoose.model("users", userSchema)

export default User;