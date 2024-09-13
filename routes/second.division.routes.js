var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log("working with nothing")
    res.render('first-division', 
        { 
            title: 'Orange Second Division League', 
            logo: "/images/league_1.png",
            param: req.query,
            league: "l1"
        }
    );
});

module.exports = router;
