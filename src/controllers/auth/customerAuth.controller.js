import { signInWithEmail } from "../../modules/auth/customer/signIn.module.js"
import { passwordResetter } from "../../modules/auth/customer/resetpassword.module.js"
import { passwordSetter } from "../../modules/auth/customer/setPassword.module.js"
import { customerOTPGenerator, customerOTPVerifer } from "../../modules/utils/otp.module.js"
import { customerDetailsUpdator, signUpWithEmail } from "../../modules/auth/customer/signUpAsCustomer.module.js"

export const loginWithEmail = signInWithEmail
export const registerWithEmail = signUpWithEmail
export const updateCustomerDetails = customerDetailsUpdator
// export const generateOTP = customerOTPGenerator
export const verifyOTP = customerOTPVerifer
export const resetPassword = passwordResetter
export const setPassword = passwordSetter