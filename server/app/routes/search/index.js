'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
var Promise = require('q');

module.exports = router;

var Product = mongoose.model('Product');
var Store = mongoose.model('Store');

router.get('/', function (req, res, next) {
    var searchTerm = req.query.term;
    var dbSearchArr = [
        //searches text in the field to see, case insensitively, that it contains the term
        Store.find({name : {$regex : searchTerm, $options: 'i'}}).exec(),
        Product.find({name : {$regex : searchTerm, $options: 'i'}}).exec()
    ];
    Promise.all(dbSearchArr).spread(function(storeArr, productArr){
        res.json({
            stores : storeArr,
            products : productArr
        });
    }).catch(function(err){
        return next(err);
    });
});

router.get('/:id', function(req, res, next){
    var searchTerm = req.query.term;
    //searches text in the field to see, case insensitively, that it contains the term
    Product.find({name : {$regex : searchTerm, $options: 'i'},
                    store : req.params.id
                }, function(err, data){
                    if (err) return next(err);
                    res.json(data);
                });
});