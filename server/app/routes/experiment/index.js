'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');
var fs = require ('fs');
var fakebody= "background: blue;"

router.post('/', function (req, res, next) {
	console.log("color: ",req.body.nav);
	if(req.body.nav==true){
		var nav="none";
		var drop="none";
	}
	if (req.body.backcolor!==undefined || req.body.backimage!==undefined){
		var drop="none";
	}
    fs.writeFile("public/"+req.body.user+".css", "body{background: "+req.body.backcolor+"; background-image:url("+req.body.backimage+");} #storepage .main-container *{color: "+req.body.fontcolorone +"; text-shadow: 0 0 2px "+req.body.fontshadow+", -1px -1px 14px "+req.body.fontshadow+ ", -2px -2px 14px"+ req.body.fontshadow+", 1px 1px 14px "+req.body.fontshadow+", 2px 2px 14px "+req.body.fontshadow+";} #storepage nav.main-container h1{color:"+req.body.fontcolortwo+";} #drop{display: "+drop+";} #custom-hide{display:"+nav+";}", function(err){
    	if (err){
    		return console.log(err)
    	}
    	console.log("Success!")
    })
        res.send(req.body);
});