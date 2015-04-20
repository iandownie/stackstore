'use strict';

var router = require('express').Router();
module.exports = router;
var Store = mongoose.model('Store')

router.get('/stores', function (req, res) {
    Store.find({}, function (err, foundStore){
        if (err) console.error(err);
        res.send(foundStore);
    })
});