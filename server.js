require('module-alias/register');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index.routes');
var liveRouter = require('./routes/live.routes');
var leaguesRouter = require('./routes/league.routes');
var teamsRouter = require('./routes/team.routes');
var apiRouter = require('./routes/api.routes');
var createLeaguesRouter = require('./routes/create.leagues.routes');
var firstDivisionRouter = require('./routes/first.division.routes');
var countyMeetRouter = require('./routes/county.meet.routes');
var secondDivisionRouter = require('./routes/second.division.routes');
var womenLeagueRouter = require('./routes/women.league.routes');
var matchInfoRouter = require('./routes/match.info.routes');
var signupRouter = require('./routes/signup.routes');
var adminRouter = require('./routes/admin/admin.routes');
var cors = require("cors")
var app = express();
var port = process.env.PORT || '3000'
var sqlite = require("sqlite3").verbose();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) 

//create database table
var db = new sqlite.Database("./libscores.db");


// Routes handlers
app.use('/', indexRouter);
app.use('/live', liveRouter);
app.use('/leagues', leaguesRouter);
app.use('/teams', teamsRouter);
app.use('/api', apiRouter);
app.use('/create_leagues', createLeaguesRouter);
app.use('/first_division', firstDivisionRouter);
app.use('/second_division', secondDivisionRouter);
app.use('/women_league', womenLeagueRouter);
app.use('/county_meet', countyMeetRouter);
app.use('/match_info', matchInfoRouter);
app.use('/signup', signupRouter);
app.use('/admin', adminRouter);


// start server
app.listen(port, function listener() {
  console.log(`App is listening at http//localhost:${port}`);
});
