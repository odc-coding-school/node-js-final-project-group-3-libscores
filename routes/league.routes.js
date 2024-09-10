var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('league', { title: 'League' });
});

router.post('/create_leagues', function(req, res, next) {
    //TODO: Terryson: add new league record to the leagues table
    //write you code here.
    res.render("create-leagues.ejs", {title: "Create Leagues"})
});
router.get('/:Id', function(req, res, next) {
    res.locals.id = req.params.Id
    res.render('league', { title: 'League'});
});

router.get('/create_leagues', function(req, res, next) {
    res.render("create-leagues.ejs", {title: "Create Leagues"})
});



module.exports = router;
