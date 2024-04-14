const express = require("express");
const app = express();
const expressSession = require("express-session");
const flash = require( "connect-flash" );
const path =  require("path");
app.set("view engine" , "ejs");
app.set("views" , path.join( __dirname , "views"));



// Middleware to handle session
const sessionOption = 
    { secret: "secretsession",
    resave: false, 
    saveUninitialized: true
 }

app.use(expressSession(sessionOption));
app.use(flash());

app.get("/register" , (req,res) =>{
    let {name = "anonymus"} = req.query;
    req.session.name = name;
    req.flash("info","You are registering as "+name);
    res.redirect("/hello")
})


app.get( "/hello" , (req,res)=> {
    res.render("page.ejs", {name: req.session.name,  info : req.flash("info")});
}
)

app.listen(3001, () => console.log(`Listening on port 3001`));