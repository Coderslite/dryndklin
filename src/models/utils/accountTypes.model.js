import mongoose from "mongoose";
import { timestamp } from "../../data/timestamp.data.js";
import { accountTypeData } from "../../data/vendors/accountType.data.js";

const accountTypesSchema = new mongoose.Schema(accountTypeData, timestamp)


const AccountType = mongoose.model("accountTypes", accountTypesSchema)

export default AccountType;