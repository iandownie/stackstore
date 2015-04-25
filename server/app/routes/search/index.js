'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
var Promise = require('q');

module.exports = router;

var Product = mongoose.model('Product');
var Store = mongoose.model('Store');

router.get('/', function (req, res, next) {
    
});

router.get('/:id', function(req, res, next){
    var searchTerm = req.query;
    console.log(searchTerm);
    Product.find({ name : {
                        $text : {
                            $search : req.query
                            }
                        }, 
                    store : req.params.id 
                }, function(err, data){
                    if (err) return next(err);
                    res.json(data);
                });
});