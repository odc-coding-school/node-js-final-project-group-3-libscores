var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('team', { title: 'Team' });
});
router.get('/squard', function(req, res, next) {
    res.render('Squard', { title: 'Squard' });
});

module.exports = router;
