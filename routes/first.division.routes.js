var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log(req.query)
    res.render('first-division', 
        { 
            title: 'Orange First Division League', 
            logo: "/images/league_1.png",
            param: req.query
        }
    );
});

module.exports = router;
