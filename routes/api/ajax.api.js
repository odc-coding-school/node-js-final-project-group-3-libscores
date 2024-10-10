var router = require('express').Router();

router.get('/matches', (req, res) => {
    res.render('dashboard/matches.dash.ejs');
});

router.get('/teams', (req, res) => {
    res.render('dashboard/teams.dash.ejs');
});

router.get('/groups', (req, res) => {
    res.render('dashboard/groups.dash.ejs');
});

module.exports = router
