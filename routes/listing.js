const express  = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema }= require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")







const validateListing =(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errmsg)
}else{
    next();
}};






//new route
router.get("/new" , wrapAsync(async(req,res) =>{
    res.render("listings/new.ejs")

}));


//index Route
router.get("/" , wrapAsync(async(req,res) =>{
    const allListings = await  Listing.find({});
    res.render("listings/index.ejs" , {allListings})
 
}));

//show route
router.get("/:id" , wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs" , {listing});
}));

//create Route
router.post("/" ,validateListing,
wrapAsync(async(req,res,next) =>{

const newListing =new Listing(req.body.listing);
await newListing.save();
req.flash = ( "success","Your listing has been created!");
res.redirect("/listings");

}));


//Edit Route
router.get("/:id/edit" , wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing})
}));



//update Route+
router.put("/:id" ,validateListing, wrapAsync(async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id ,{...req.body.listing} );
    res.redirect(`/listings/${id}`);

}));



//delete Route
router.delete('/:id', wrapAsync(async (req, res) => {
    try {
        let { id } = req.params;
        const deleteListing = await Listing.findByIdAndDelete(id);
        console.log(deleteListing);
        res.redirect("/listings");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting listing");
    }
}));



module.exports = router;
