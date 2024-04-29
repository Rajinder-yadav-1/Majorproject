const User = require("../models/user");


//signup form fun
module.exports.renderSignupForm = (req, res) => {
    res.render("user/signup.ejs")
 };  


//get signup fun
module.exports.signUp = async(req,res) =>{
   
    try{
        let {username, email, password} = req.body
        const newUser = new User({username,email})
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err) => {
            if(err){
                return next(err)
            }

            req.flash("success" , "Welocome to Wanderlust");
            res.redirect("/listings")
           
        })
       
    
    }catch(e) {
        req.flash("error" , e.message);
        res.redirect("/signup")
    }
   
};

//render login form fun
module.exports.renderLoginForm = (req,res) =>{
    res.render("user/login.ejs")
};


//save login form data fun
module.exports.login =(req,res) =>{   
    req.flash("success" , "Welcome back");
    let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
};



//logout fun
module.exports.logOut = (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }else{
            req.flash("success" , "Goodbye");
            res.redirect("/listings");
        }
    })
};


