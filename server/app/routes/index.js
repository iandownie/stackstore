'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/products', require('./products'));
router.use('/stores', require('./stores'));
router.use('/users', require('./users'));
router.use('/members', require('./members'));
router.use('/orders', require('./orders'));
router.use('/category', require('./categories'));
router.use('/reviews', require('./reviews'));
router.use('/admin', require('./admin'));
router.use('/experiment', require('./experiment'));
router.use('/cart', require('./cart'));
router.use('/search', require('./search'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});