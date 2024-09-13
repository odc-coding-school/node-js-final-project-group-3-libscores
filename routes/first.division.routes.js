var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('first-division', { title: 'Orange First Division League', logo: "/images/league_1.png"});
});

module.exports = router;
