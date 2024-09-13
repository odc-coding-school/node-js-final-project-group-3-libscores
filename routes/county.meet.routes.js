var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
            page: "second_division"
    res.render('county-meet', { title: 'First Division', league: "cm", page: "county_meet" });
});

module.exports = router;
