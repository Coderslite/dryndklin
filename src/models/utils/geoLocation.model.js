import mongoose from "mongoose";
import { geoLocationData } from "../../data/geoLocation.data.js";

const geoLocationSchema = new mongoose.Schema(geoLocationData)

export default geoLocationSchema;