import { Router } from "express";
import { resetPassword, registerWithEmail, loginWithEmail, verifyOTP, updateCustomerDetails } from "../../controllers/auth/customerAuth.controller.js";
// const { updateUser } = require("../controllers/users.controller");
import { sendOTP } from "../../controllers/mailer.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { customer } from "../../middleware/customer.middleware.js";
import { customerVerifier } from "../../middleware/jwt.middleware.js";
import passport from "passport";

const router = Router();

// POST Methods
router.post("/login/email", loginWithEmail) // Login Vendor with email
router.post('/register/email', registerWithEmail) // Register User with email
router.post('/update/details', auth, customer, customerVerifier, updateCustomerDetails) // Register User with phone
router.post("/authenticate", (req, res) => res.end()) // Authenticate User
// router.post("/sendOtp", generateOTP) // Send Mail


router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);


// GET Methods
router.get("/verifyOTP", auth, customer, customerVerifier, verifyOTP) // Verify OTP
// router.get("/createResetSession", createResetSession) // Reset all the variables

router.put("/resetPassword", resetPassword)

export default router
