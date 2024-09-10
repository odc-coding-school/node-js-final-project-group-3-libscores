var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('create-leagues', { title: 'Create League' });
});

router.post('/', function(req, res, next) {
    //TODO: Terryson: add new league record to the leagues table
    //write you code here.
});

module.exports = router;
