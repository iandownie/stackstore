'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var Store = mongoose.model('Store');
var User = mongoose.model('User');

router.get('/', function (req, res) {
    Store.findAndPopulate()
        .then(function(stores){
            res.send(stores);
        });
});
router.put('/:id', function (req, res, next) {
    Store.findByIdAndUpdate(req.params.id, req.body, function(err, data){
        if(err) return next(err);
        console.log("data: ", data);
        res.json(data);
    });
   
});
router.get('/:id', function (req, res) {
    Store.findByIdAndPopulate(req.params.id)
        .then(function(stores){
            res.send(stores);
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
        res.send(newStore);

    });
});