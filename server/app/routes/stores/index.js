'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var Store = mongoose.model('Store');
var User = mongoose.model('User');

router.get('/', function (req, res, next) {
    Store.findAndPopulate()
        .then(function(stores){
            res.json(stores);
        });
});

router.put('/:id', function (req, res, next) {
    Store.findByIdAndUpdate(req.params.id, req.body, function(err, data){
        if(err) return next(err);
        console.log("data: ", data);
        res.json(data);
    });

});

router.get('/:id', function (req, res, next) {
    //default is get all items
    var query = {};

    if(req.query.hasOwnProperty('categories')){
        if (typeof req.query.categories === 'string'){
            //if you click only one option in the select, categories will be a string
            query = req.query;
        } else {
            //if you click multiple options in the selection, categories will be an array
            query = {categories : {$in : req.query.categories}};
        }
    }

    Store.findByIdAndCategory(req.params.id, query)
            .then(function(store){
                res.json(store);
            });
});

router.delete('/:id', function (req, res, next) {
    Store.findByIdAndRemove(req.params.id, function(err, data){
        if(err) return next(err);
        res.json(data);
    });
});

router.post('/', function (req, res, next){
    Store.createStoreAndAttachUser(req.body, function (err, newStore){
        if (err) return next(err);
        res.json(newStore);

    });
});