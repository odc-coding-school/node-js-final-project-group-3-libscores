var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('league', { title: 'League' });
});
router.get('/:Id', function(req, res, next) {
    res.locals.id = req.params.Id
    res.render('league', { title: 'League'});
});


module.exports = router;
