if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require("express");
const  app = express();
const mongoose= require('mongoose');
const path =  require("path");
const methodOverride = require("method-override")
const ejsMate  = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL
main()
.then(() =>{
    console.log("connecte to db")
})
.catch(err=>console.error(err));
async function main(){
    await mongoose.connect(dbUrl);
};

app.set("view engine" , "ejs");
app.set("views" , path.join( __dirname , "views"));
app.use(express.urlencoded ({extended: true}));
app.use(methodOverride("_method"));
app.engine( "ejs", ejsMate );
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter : 24*60*60,
});

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie :{
        httpOnly:true,
        expires : Date.now() + 7 *24*60*60*1000 ,
        maxAge : 7 *24*60*60*1000 ,// one week
    }
};

store.on("error",function(e){
    console.log("session store error",e);
});

app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/demouser" , async(req,res) => {
    let fakeuser = new User({
        email : "joharsh@gmai.com",
        username : "harshlikhari",
     
    });

    let registereduser = await User.register(fakeuser,"guruGantal") ;
    res.send(registereduser);
})





app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next() ;
})








app.use("/listings" , listingRouter) 
app.use("/listings/:id/reviews" , reviewRouter)
app.use("/" , userRouter)





app.all("*", (req,res,next) =>{
    next(new ExpressError(400,"Page not found !"));
});






app.use((err,req,res,next)=>{
    let{statusCode=500 ,message="something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs" ,{message});
});

app.listen(8080,()=>{
    console.log("listening to port 8080")
});
 


