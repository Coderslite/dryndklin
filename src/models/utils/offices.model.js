import mongoose from "mongoose";
import { timestamp } from "../../data/timestamp.data.js";
import { officeData } from "../../data/offices.data.js";

const vendorOfficeAddressSchema = new mongoose.Schema(officeData, timestamp)

export default vendorOfficeAddressSchema;