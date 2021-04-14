const express 				 = require("express"),
      app 					 = express(),
      bodyParser			 = require("body-parser"),	// permite obtener datos del body (req.body), transformando a body en un obj
      mongoose  			 = require("mongoose"),
	  passport				 = require("passport"),
	  LocalStrategy			 = require("passport-local"),
	  passportLocalMongoose  = require("passport-local-mongoose"),
	  methodOverride		 = require("method-override"),
	  User					 = require("./models/user.js"),
	  Campground	 		 = require("./models/campground"),
 	  SeedDB 				 = require("./models/seed");
//routes
const campgroundsRoutes  = require("./routes/campgrounds"),
	  commentsRoutes	 = require("./routes/comments"),
      index  			 = require("./routes/index");

//=======SERVER======
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/campamentos_tos", {useNewUrlParser: true})
const db= mongoose.connection;
db.on("error",console.error.bind(console, "problemaaass de conexiooon:"));
db.once("open", function(){
	console.log("CONECTADO AL SERVIDOR :D")
})

//=======APP=======
//SeedDB();
app.use(bodyParser.urlencoded({extended:true})); // necesario para su funcionamiento
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")); //dirname, ubicacion del archivo por si se mueve. 												vinculacion para buscar en public
app.use(methodOverride("_method"));

//======CONFIG PASSPORT=====
app.use(require("express-session")({
	secret:"warevaa",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){  //esto se carga luego de cada request, actuando como 										 middleware, mando info a todas las rutas
	res.locals.currentUser = req.user; // manda la info del user a la template
	//console.log(req.user);
	//console.log(res.locals.currentUser);
	next();
})

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);
app.use(index);

app.listen(3002, function(){
	console.log("APP ITSSS READYYYY!! :D")
})
