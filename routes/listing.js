const express  = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {stroage} = require("../cloudConfig.js")
const upload = multer({stroage})



//create Route
//index Route
router.route("/")
.get(  wrapAsync(listingController.Index))
// .post(validateListing, wrapAsync(listingController.createListing));
.post(upload.single('listing[image]') ,(req,res) =>{
    res.send(req.file)
})



//new route
router.get("/new" ,isLoggedIn, wrapAsync(listingController.renderNewForm));






//update Route+
//show route
//delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( validateListing, isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));




//Edit Route
router.get("/:id/edit" , isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
