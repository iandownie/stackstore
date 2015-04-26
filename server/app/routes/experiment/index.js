'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');
var fs = require ('fs');
var fakebody= "background: blue;"

router.post('/', function (req, res, next) {
    fs.writeFile("public/"+req.body.user+".css", "body{background: "+req.body.backcolor+"; background-image:"+req.body.backimage+";} #storepage{text-shadow:"+req.body.fontshadow+"; color: "+req.body.fontcolorone +"; text-shadow: 0 0 2px "+req.body.fontshadow+", -1px -1px 14px "+req.body.fontshadow+ ", -2px -2px 14px"+ req.body.fontshadow+", 1px 1px 14px "+req.body.fontshadow+", 2px 2px 14px "+req.body.fontshadow+";} #storepage h1{color:"+req.body.fontcolortwo+";} ", function(err){
    	if (err){
    		return console.log(err)
    	}
    	console.log("Success!")
    })
        res.send(req.body);
});