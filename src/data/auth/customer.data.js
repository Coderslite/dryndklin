import mongoose from "mongoose";
import { ROLE } from "../roles.data.js";

export const userData = {
    role: {
        type: String,
        required: false,
        default: ROLE.CUSTOMER
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    emailVerification: {
        type: Boolean,
        required: true,
        default: false
    },
    googleId: {
        type: String,
        required: false,
        default: null
    },
    facebookId: {
        type: String,
        required: false,
        default: null
    },
    appleId: {
        type: String,
        required: false,
        default: null
    },
    surname: {
        type: String,
        minlength: 2,
        maxlength: 16,
        required: false,
        default: null
    },
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 16,
        required: false,
        default: null
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false,
    },
    countryCode: {
        type: String,
        minlength: 2,
        maxlength: 6,
        required: false,
        default: null
    },
    phone: {
        type: String,
        minlength: 2,
        maxlength: 16,
        required: false,
        default: null
    },
    city: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: false,
        default: null
    },
    state: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: false,
        default: null
    },
    country: {
        type: String,
        minlength: 2,
        maxlength: 16,
        required: false,
        default: null
    },
    password: {
        type: String,
        minlength: 4,
        required: false,
        default: null
    },
    otp: {
        type: String,
        min: 4,
        required: false,
        default: null
    },
    profilePic: {
        type: String,
        minlength: 2,
        required: false,
        default: null
    },
    balance: {
        type: String,
        required: true,
        default: 0.00,
    },
    inviteCode: {
        type: String,
        minlength: 4,
        maxlength: 6,
        unique: true,
        required: false,
        default: null
    },
    referralCode: {
        type: String,
        minlength: 4,
        maxlength: 6,
        required: false,
        default: null
    },
    activityStatus: {
        type: Boolean,
        required: true,
        default: false,
    }
}
