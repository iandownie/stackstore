'use strict';

var mongoose = require('mongoose');
var Product=mongoose.model("Product");

var router = require('express').Router();


router.get('/:id', function (req, res) {
    Product.findOne(req.params.id, function(err, data){
        res.json(data);
    })

});

module.exports = router;
