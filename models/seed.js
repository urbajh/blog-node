const mongooose = require('mongoose'),
	  Campground = require('./campground'),
	  Comment = require('./comment');



var seeds = [
	{
		name:"Roquitas",
	img: 'https://cdn.civitatis.com/chile/santiago-de-chile/galeria/campamento-cerro-plomo.jpg',
	description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32'
	},
	{
		name:"Roquitas",
	img: 'https://cdn.civitatis.com/chile/santiago-de-chile/galeria/campamento-cerro-plomo.jpg',
	description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32'
	},
	{	
		name:"Roquitas",
	img: 'https://cdn.civitatis.com/chile/santiago-de-chile/galeria/campamento-cerro-plomo.jpg',
	description: 'campamento lleno de rocas, no ir descalzo'
	},
	{
		name:"Roquitas",
	img: 'https://cdn.civitatis.com/chile/santiago-de-chile/galeria/campamento-cerro-plomo.jpg',
	description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32'
	}
];


function seedDB(){
	Campground.deleteMany({},function(err){
		if(err){
			console.log("hay problemas"+ err);
		} else{
			console.log("campamentos removidos");
			Comment.deleteMany({}, function(err){
				if(err){
					console.log(err);
				} else{
					console.log("comentarios removidos");
				seeds.forEach(function(seed){
				Campground.create(seed, function(err,camp){
					if(err){
						console.log(err);
					} else {
						console.log("se ha creado un campamento");
						//console.log(camp.name);
						Comment.create(
							{
							content:'KKKKKK',
							author:'Pedro'
							},
							function(err, comment){
							if(err){
								console.log(err);
							}else{
								//console.log(camp);
								console.log("se ha creado un comentario");
							camp.comments.push(comment)
								//console.log("se ha creado un comment");
								//console.log(camp.comment);
							camp.save();
							}
						});
					}
				});
				
			})
				}
			})
				
		}
	})
}

module.exports = seedDB;