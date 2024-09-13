var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('women-league', 
        { 
            title: 'Women League', 
            logo: "/images/women_league.jpg",
            param: req.query,
            league: "wl",
            page: "women_league"
        }
    );
});

module.exports = router;
