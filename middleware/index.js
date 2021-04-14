//contiene todos los middlewares debido a que no son tantos
const Comment 		= require("../models/comment"),
	  Campground	= require("../models/campground");

const middleware ={};

middleware.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

//-----middlewares campgroud----

middleware.campAuthorization = function (req, res, next){
	//verificar si esta logeado *authenticated
	if(req.isAuthenticated()){
		//verificar si le pertenece el campgrounds mediante el id del camp y el id del autor *permiso
		Campground.findById(req.params.id, function(err, campFindIt){
			if(err){
				console.log(err);
			}
			else{
				if(campFindIt.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
};


//-----middlewares comment----

middleware.commentOwner = function(req, res, next){
	//verificar si esta logeado *authenticated
	if(req.isAuthenticated()){
		//verificar si le pertenece el campgrounds mediante el id del camp y el id del autor *permiso
		Comment.findById(req.params.comment_id, function(err, commentFindIt){
			if(err){
				console.log(err);
			}
			else{
				if(commentFindIt.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
};

module.exports = middleware;