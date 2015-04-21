'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var Store = mongoose.model('Store');

router.get('/getAllStores', function (req, res) {
    Store.find({})
        .populate('products')
        .exec(function (err, foundStores){
            if (err) console.error(err);
            res.send(foundStores);
    })
});