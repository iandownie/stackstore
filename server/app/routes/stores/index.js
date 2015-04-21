'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var Store = mongoose.model('Store');
var User = mongoose.model('User');

router.get('/getAllStores', function (req, res) {
    Store.find({})
        .populate('products')
        .populate('user')
        .exec(function (err, foundStores){
            if (err) console.error(err);
            res.send(foundStores);
    })
});

router.get('/:id', function (req, res) {
    Store.findById(req.params.id)
        .populate('products')
        .populate('user')
        .exec(function (err, store){
            if (err) console.error(err);
            res.send(store);
        })
});

router.post('/store', function (req, res){

    Store.create(req.body, function(err, newStore){
        if (err) console.error (err);
        User.findById(req.body.userId, function (err, user) {
            if (err) console.error (err);
            user.store = newStore._id;
            user.save(function (){
                newStore.user = user._id;
                newStore.save(function(){
                    res.send(newStore);
                })
            })
        });
    })
})