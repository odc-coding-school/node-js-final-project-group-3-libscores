var express = require('express');
var router = express.Router();
var cheerio = require("cheerio")
var axios = require("axios")
var allLeaguesApiUrl =""
var app = require("../app")

/* GET home page. */
router.get('/', async function(req, res, next) {
  let leagues = {}
  let options = { title: 'libScores', league: "/" }
  try {
    await axios.get("https://www.thesportsdb.com//api/v1/json/3/search_all_leagues.php?c=Liberia")
    .then(response => {
      console.log(response.data.countries[0])
      app.locals.league_1 = response.data.countries[0]
    })
    .catch(error => console.log(error))
    res.render('index', options);
  } catch (err) {
    console.log(err)
    options.err = err
    res.render('index', options);
  }
});

module.exports = router;
