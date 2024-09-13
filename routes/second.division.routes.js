var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log("working with nothing")
    res.render('first-division', 
        { 
            title: 'Orange Second Division League', 
            logo: "/images/league_2.jpg",
            param: req.query,
            league: "l2"
        }
    );
});

module.exports = router;
