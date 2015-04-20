'use strict';

var router = require('express').Router();
module.exports = router;

router.get('/:id', function (req, res) {
    res.send(req.params.id);
});