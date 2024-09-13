var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('county-meet', { title: 'First Division', league: "cm" });
});

module.exports = router;
