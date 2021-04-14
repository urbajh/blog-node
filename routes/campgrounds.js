const express    = require("express"),
	  router     = express.Router({mergeParams:true}),
	  Campground = require("../models/campground"),
	  middleware = require("../middleware");


router.get("/", function(req, res){
	Campground.find({}, function(err, camp){
		if(err){
			console.log("HAY UN PROBLEMAA!!!")
			console.log(err)}
		else{
			res.render("Index",{camp:camp});
			}
	})
})

router.post("/",middleware.isLoggedIn, function(req, res){	
	console.log(req.body.campground);
	Campground.create(req.body.campground,function(err, campground){
		if(err){
		   console.log("HAY UN ERROR D:");
			console.log(err);
		   } else{
			   	var author={
					username: req.user.username,
					id: req.user._id
			  };
			   campground.author = author;
			   campground.save()
			   console.log(campground)
			   res.redirect("/campgrounds");
		   }
	})
})

router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new")
})

router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, camp){	
		if(err){
				console.log(err);
			} else {
				res.render("campgrounds/show", {camp:camp});
			}	
	})
});

router.get("/:id/edit",middleware.campAuthorization, function(req, res){
		Campground.findById(req.params.id, function(err, campFindIt){
			if(err){
				console.log(err);
			}
			else{
				res.render('campgrounds/edit.ejs', {campground:campFindIt});
		}
	});
});
router.put('/:id',middleware.campAuthorization, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
	if(err){
		console.log(err);
	}else{
		res.redirect("/campgrounds/" + req.params.id);
	}	
	})
});	

router.delete("/:id", middleware.campAuthorization, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, camp){
		if(err){
			console.log(err);
		}else{
			console.log("campamento borrado");
			res.redirect("/campgrounds")
		}
	})
})


module.exports= router;