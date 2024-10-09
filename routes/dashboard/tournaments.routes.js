var router = require('express').Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let options = { title: 'Tournaments Dashboard', league: "tournaments" }
  try {
       res.render('dashboard/tournaments.dash.ejs', options);
  } catch (err) {
    options.err = err
    res.render('dashboard/tournaments.dash.ejs', options);
  }
});


module.exports = router;
