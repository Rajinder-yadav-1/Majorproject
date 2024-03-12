const express = require("express");
const  app = express();
const mongoose= require('mongoose');
const Listing = require("./models/listing.js")
const path =  require("path");
const methodOverride = require("method-override")
const ejsMate  = require("ejs-mate");





const MONGO_URL =('mongodb://127.0.0.1:27017/wanderlust');
main()
.then(() =>{
    console.log("connecte to db")
})
.catch(err=>console.error(err));
async function main(){
    await mongoose.connect(MONGO_URL);
};

app.set("view engine" , "ejs");
app.set("views" , path.join( __dirname , "views"));
app.use(express.urlencoded ({extends : true}));
app.use(methodOverride("_method"));
app.engine( "ejs", ejsMate );
app.use(express.static(path.join(__dirname, "/public")));


app.get("/",(req,res) =>{
    res.send("hi iam root")
})

//new route
app.get("/listings/new" , async(req,res) =>{
    res.render("listings/new.ejs")

});


//index Route
app.get("/listings" , async(req,res) =>{
    const allListings = await  Listing.find({});
    res.render("listings/index.ejs" , {allListings})
 
});

//show route
app.get("/listings/:id" , async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
});

//create Route
app.post("/listings" , async(req,res) =>{
const newListing =new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");


});


//Edit Route
app.get("/listings/:id/edit" , async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing})
});



//update Route
app.put("/listings/:id" , async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , req.body.listing);
    res.redirect(`/listings/${id}`);

});

//delete Route
app.delete('/listings/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const deleteListing = await Listing.findByIdAndDelete(id);
        console.log(deleteListing);
        res.redirect("/listings");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting listing");
    }
});

app.listen(8080,()=>{
    console.log("listening to port 8080")
});
