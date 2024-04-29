const Listing = require("../models/listing.js")



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

    const newListing =new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash ( "success","New Listing Created!");
    res.redirect("/listings");
    
};


//edit form fun
module.exports.renderEditForm = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    req.flash ( "success","Listing updated !");
    if(!listing){
        req.flash("error" , "Listing You Are Requested Does not exist !");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs" , {listing})
};



//update fun
module.exports.updateListing = async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id ,{...req.body.listing} );
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