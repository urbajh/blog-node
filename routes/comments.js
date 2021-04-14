const express	 = require("express"),
	  router  	 = express.Router({mergeParams:true}), // agrega los parametros pasador por la fijacion de url en app.js
	  Campground = require("../models/campground"),
	  Comment 	 = require("../models/comment"),
	  middleware = require("../middleware");
	

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campFound){
	if(err){
		console.log(err);
	}	else {
		res.render("comments/new", {camp:campFound});
	}})
})

//CREATE COMMENT
router.post("/", middleware.isLoggedIn, function(req, res){
	//aggrar la info
	Campground.findById(req.params.id, function(err, camp){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					camp.comments.push(comment);
					camp.save();
					res.redirect("/campgrounds/"+req.params.id);
				}
			})
		}
	})
})
//EDIT COMMENT
router.get('/:comment_id/edit', middleware.commentOwner ,function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit.ejs", {camp_id:req.params.id, comment:foundComment})
		}
	})
})
//COMMENT UPDATE
router.put("/:comment_id", middleware.commentOwner, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect('back');
		}
		else{
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

//DELETE COMMENT
router.delete('/:comment_id',middleware.commentOwner, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect('back');
		}		
		else{
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})


module.exports=router;