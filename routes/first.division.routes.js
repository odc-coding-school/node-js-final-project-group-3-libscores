var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('first_division', { title: 'First Division' });
});

module.exports = router;
