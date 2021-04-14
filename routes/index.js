const express = require("express"),
	  router  = express.Router(),
	  User 	  = require("../models/user"),
	  passport= require("passport");	  

router.get("/", function(req, res){
	res.redirect("/campgrounds");
})

//=====AUTHENTICATION ROUTES======
router.get("/register",function(req, res){
	res.render("authentication/register");
})
router.post("/register", function(req, res){
	var newUser=new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/")
		})
	})
})

 router.get("/login", function(req, res){
	 res.render("authentication/login");
 })

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}), function(req, res){
})

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;