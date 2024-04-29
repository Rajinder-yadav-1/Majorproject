const express  = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js")
const passport = require("passport");
const { SaveRedirectUrl } = require("../middleware");

const userController  = require("../controllers/users.js");
const user = require("../models/user.js");

//signup form
//signup save in dbs
router.route("/signup")
.get( userController.renderSignupForm)
.post(wrapAsync (userController.signUp))


//login form
//save login data
router.route("/login")
.get( userController.renderLoginForm)
.post( SaveRedirectUrl,
passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), 
userController.login);



//logout
router.get("/logout" , userController.logOut);




module.exports = router;

