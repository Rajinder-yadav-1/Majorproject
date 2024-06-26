const Listing = require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


//index view (main front page) fun
module.exports.Index = async(req,res) =>{
    const allListings = await  Listing.find({});
    res.render("listings/index.ejs" , {allListings})
 
}



//add new listing fun
module.exports.renderNewForm = async(req,res) =>{
    res.render("listings/new.ejs")

};



//show listing fun
module.exports.showListing = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
    if(!listing){
        req.flash("error" , "Listing You Are Requested Does not exist !");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs" , {listing});
};


//create new listing fun
module.exports.createListing = async(req,res,next) =>{
   
    let respone  = await geocodingClient
    .forwardGeocode({
        query:req.body.listing.location,
        limit: 1
    })
    .send()

   
 

    const newListing =new Listing(req.body.listing);
    let url = req.file.path;
    let filename = req.file.filename;

    newListing.owner = req.user._id;
    newListing.image = {url , filename}
    newListing.geometry = respone.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing)
    req.flash ( "success","New Listing Created!");
    res.redirect("/listings");
    
};


//edit form fun
module.exports.renderEditForm = async(req,res) =>{
    console.log("here")
    let {id} = req.params;
    const listing = await Listing.findById(id);
    req.flash ( "success","Listing updated !");
    if(!listing){
        req.flash("error" , "Listing You Are Requested Does not exist !");
        return res.redirect("/listings");
    }

    console.log(listing.image.url)
    let originalImageUrl = listing.image.url
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs" , {listing,originalImageUrl})
};



//update fun
module.exports.updateListing = async(req,res) =>{
    let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id ,{...req.body.listing} );
   
if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename}
    await listing.save();
}
   
    req.flash ( "success","Listing updated !");
    res.redirect(`/listings/${id}`);

};



//delete function
module.exports.destroyListing = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteListing = await Listing.findByIdAndDelete(id);
        console.log(deleteListing);
        req.flash ( "success","Listing Deleted!");
        res.redirect("/listings");
     
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting listing");
    }
};