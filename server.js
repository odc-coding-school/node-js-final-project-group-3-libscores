const dotenv = require('dotenv');
dotenv.config();
require('module-alias/register');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
const { useLeaguesDB  } = require('@utils/dbUtils');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);  // Create the HTTP server instance
const io = new Server(server);          // Initialize Socket.io with the server
app.use((req, res, next) => {
  req.io = io;
  next();
});

var cors = require("cors");
const getDbInstance = require('@js/getDBInstance');
var port = process.env.PORT || '3000'
var sqlite3 = require("sqlite3").verbose();
var restrict = require("@middleware/restrict");
var protected = require("@middleware/restrict");
var session = require("express-session");
var SQLiteStore = require("connect-sqlite3")(session)


app.use(cors()) 
app.use(
  session({
    store: new SQLiteStore,
    secret: "RSTUVWXYZabcdefghijklmyz0123456789!@#$%^&*()_+[]{}|;:,.<>?",
    resave: true,
    saveUninitialized: false,
    cookie: { 
      secure: false, 
      // maxAge: 7*24*60*60*1000, //1 week
      maxAge: 60*60*1000, //1 hr
    },
  }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const db = useLeaguesDB()
// Export io for use in other files

// leagues and frontend routes
var indexRouter = require('./routes/index.routes');
var liveRouter = require('./routes/live.routes');
var resultRouter = require('./routes/results.routes');
var fixtureRouter = require('./routes/fixtures.routes');
var leaguesRouter = require('./routes/league.routes');
var teamsRouter = require('./routes/team.routes');
var apiRouter = require('./routes/api');
var createLeaguesRouter = require('./routes/create.leagues.routes');
var firstDivisionRouter = require('./routes/first.division.routes');
var countyMeetRouter = require('./routes/county.meet.routes');
var secondDivisionRouter = require('./routes/second.division.routes');
var womenLeagueRouter = require('./routes/women.league.routes');
var matchInfoRouter = require('./routes/match.info.routes');
var signupRouter = require('./routes/signup.routes');
const searchRoutes = require('./routes/search.routes'); 

// dashboard/admin routes
var adminRouter = require('./routes/admin/admin.routes');
var cmRouter = require('./routes/admin/cm.routes');
var fdRouter = require('./routes/admin/fd.routes');
var sdRouter = require('./routes/admin/sd.routes');
var wlRouter = require('./routes/admin/wl.routes');
var loginRouter = require('./routes/login.routes');

db.serialize(function createDB() {
  db.run("CREATE TABLE IF NOT EXISTS editions (id INTEGER PRIMARY KEY AUTOINCREMENT,  edition VARCHAR(50) NOT NULL UNIQUE, start DATE NOT NULL, end DATE NOT NULL, host VARCHAR(50) NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS counties(id INTEGER PRIMARY KEY AUTOINCREMENT,  county VARCHAR(50)  NOT NULL, flag VARCHAR(50) NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meets(id INTEGER PRIMARY KEY AUTOINCREMENT,  county VARCHAR(50) NOT NULL, team_group VARCHAR(15) NOT NULL, edition_id INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_matches(id INTEGER PRIMARY KEY AUTOINCREMENT,  home_team VARCHAR(50) NOT NULL, away_team VARCHAR(50) NOT NULL, score_1 INTEGER NULL, score_2 INTEGER NULL, start_time DATE NOT NULL, edition_id INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_corners(id INTEGER PRIMARY KEY AUTOINCREMENT,  team_id INTEGER NOT NULL, corner_time VARCHAR(50) NOT NULL, match_id INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_substitution(id INTEGER PRIMARY KEY AUTOINCREMENT,  player_in_id INTEGER NOT NULL, player_out_id INTEGER NOT NULL,  sub_time VARCHAR(50) NOT NULL, match_id INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_players(id INTEGER  PRIMARY KEY AUTOINCREMENT,  first_name VARCHAR(50)  NOT NULL, middle_name VARCHAR(50) NULL, last_name VARCHAR(50) NOT NULL, DOB DATE NOT NULL, photo VARCHAR(50) NULL, county_id INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_goals(id INTEGER  PRIMARY KEY AUTOINCREMENT,  player_id VARCHAR(50)  NOT NULL, match_id INTEGER NOT NULL, goal INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_cards(id INTEGER  PRIMARY KEY AUTOINCREMENT,  player_id VARCHAR(50)  NOT NULL, match_id INTEGER NOT NULL, card INTEGER NOT NULL, card_time VARCHAR(50) NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_standing(id INTEGER  PRIMARY KEY AUTOINCREMENT,  county_meet_id INTEGER NOT NULL, county_id INTEGER NOT NULL, play INTEGER NOT NULL, win INTEGER NOT NULL, loss INTEGER NOT NULL, draws INTEGER NOT NULL, goals_for INTEGER NOT NULL, goals_against INTEGER NOT NULL, points INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS county_meet_match_lineup(id INTEGER  PRIMARY KEY AUTOINCREMENT,  player_id INTEGER NOT NULL, county_id INTEGER NOT NULL, match_id INTEGER NOT NULL)");
  db.run("CREATE TABLE IF NOT EXISTS groups(id INTEGER  PRIMARY KEY AUTOINCREMENT,  edition_id INTEGER NOT NULL, county_id INTEGER NOT NULL, groups VARCHAR(50) NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(50) NOT NULL, DOB DATE NOT NULL, position CHAR(10) NOT NULL, club_id INTEGER NOT NULL, country_id INTEGER NOT NULL, county_id INTEGER NULL, status VARCHAR(50) NOT NULL, market_value INTEGER NULL, agent VARCHAR(50) NULL, photo VARCHAR(50) NULL)");

  db.run("CREATE TABLE IF NOT EXISTS competitions (id INTEGER PRIMARY KEY AUTOINCREMENT,  competition VARCHAR(50) NOT NULL, country_id INTEGER NOT NULL, players INTEGER NULL, market_value INTEGER NULL, continent VARCHAR(50) NOT NULL, logo VARCHAR(50) NULL, founded DATE NULL,  type VARCHAR(50) NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS clubs (id INTEGER PRIMARY KEY AUTOINCREMENT, club VARCHAR(50) NOT NULL, founded VARCHAR(50) NULL, country_id INTEGER NOT NULL, squad INTEGER NULL, stadium VARCHAR(50) NULL, market_value INTEGER NULL, badge VARCHAR (50) NOT NULL )");

  db.run("CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, home INTEGER NOT NULL, away INTEGER NOT NULL, start DATE NOT NULL, status INTEGER NOT NULL, period INTEGER NOT NULL, home_goal INTEGER NOT NULL, away_goal INTEGER NOT NULL, season_id INTEGER NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, player_id INTEGER NOT NULL, game_id INTEGER NOT NULL, type VARCHAR(50) NOT NULL, minutes CHAR(10) NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, game_id INTEGER NOT NULL, team_id INTEGER NOT NULL, type VARCHAR(50) NOT NULL, minutes CHAR(10) NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS substitutions (id INTEGER PRIMARY KEY AUTOINCREMENT, game_id INTEGER NOT NULL, player_off INTEGER NOT NULL, player_in INTEGER NOT NULL , team_id INTEGER NOT NULL, minutes VARCHAR(50) NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS seasons (id INTEGER PRIMARY KEY AUTOINCREMENT, start DATE NOT NULL, end DATE NOT NULL, teams INTEGER NOT NULL , status BOOLEAN NOT NULL, games INTEGER NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS phases (id INTEGER PRIMARY KEY AUTOINCREMENT, season_id INTEGER NOT NULL, team_id INTEGER NOT NULL, status BOOLEAN NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS standings (id INTEGER PRIMARY KEY AUTOINCREMENT, season_id INTEGER NOT NULL, team_id INTEGER NOT NULL, play INTEGER NULL, win INTEGER NULL, loss INTEGER NULL, draw INTEGER NULL, goal_for INTEGER NOT NULL, goal_against INTEGER NULL, points INTEGER NULL)");

  db.run("CREATE TABLE IF NOT EXISTS scorers (id INTEGER PRIMARY KEY AUTOINCREMENT, player_id INTEGER NOT NULL, game_id INTEGER NOT NULL, goal INTEGER NOT NULL, minutes VARCHAR(50) NULL)");

  db.run("CREATE TABLE IF NOT EXISTS champions (id INTEGER PRIMARY KEY AUTOINCREMENT, competition_id INTEGER NOT NULL, season_id INTEGER NOT NULL, club_id INTEGER NOT NULL, trophy INTEGER NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS countries (id INTEGER PRIMARY KEY AUTOINCREMENT, country VARCHAR(50) NOT NULL, flag VARCHAR(50) NOT NULL)");

  db.run("CREATE TABLE IF NOT EXISTS lineups (id INTEGER PRIMARY KEY AUTOINCREMENT, game_id INTEGER NOT NULL, team_id INTEGER NOT NULL, player_id INTEGER NOT NULL, number INTEGER NULL, position NULL, start BOOLEAN NOT NULL)");

});


// NEW UI ROUTES HANDLERS
var homeUIRouter = require('./routes/ui/index.ui.routes');

// Routes handlers
app.use('/', homeUIRouter);
app.use('/live', liveRouter);
app.use('/results', resultRouter);
app.use('/fixtures', fixtureRouter);
app.use('/leagues', leaguesRouter);
app.use('/teams', teamsRouter);
app.use('/search', searchRoutes); // Make sure this points to where your search routes are defined

// app.use('/create_leagues', createLeaguesRouter);
app.use('/first_division', firstDivisionRouter);
app.use('/second_division', secondDivisionRouter);
app.use('/women_league', womenLeagueRouter);
app.use('/county_meet', countyMeetRouter);
app.use('/match_info', matchInfoRouter);
app.use('/signup', signupRouter);

app.use('/admin', adminRouter);
app.use('/admin/cm', cmRouter);
app.use('/admin/fd', fdRouter);
app.use('/admin/sd', sdRouter);
app.use('/admin/wl', wlRouter);

// DASHBOARD ROUTES
// dashboard routes
var dashboardRouter = require('./routes/dashboard');
var clubsRouter = require('./routes/dashboard/clubs.routes');
var competitionRouter = require('./routes/dashboard/competition.routes');
var seasonRouter = require('./routes/dashboard/season.routes');
var phaseRouter = require('./routes/dashboard/phase.routes');
var gamesRouter = require('./routes/dashboard/games.routes');
var playersRouter = require('./routes/dashboard/players.routes');

// DASHBOARD ROUTES HANDLERS
app.use("/dashboard", protected)
app.use("/dashboard", dashboardRouter)
app.use("/dashboard/clubs", clubsRouter)
app.use("/dashboard/competitions", competitionRouter)
app.use("/dashboard/seasons", seasonRouter)
app.use("/dashboard/phases", phaseRouter)
app.use("/dashboard/games", gamesRouter)
app.use("/dashboard/players", playersRouter)

// fetch data api routes
var countyRouter = require('./routes/api/county.routes');
var clubApiRouter = require('./routes/api/clubs.api');
var creatorRouter = require('./routes/api/creator.routes')
var gamesApiRouter = require('./routes/api/games.api')
var competitionsApiRouter = require('./routes/api/competitions.api')
var activitiesApiRouter = require('./routes/api/activities.api')


// API v1 Endpoints
app.use("/counties", countyRouter)
app.use("/login", loginRouter)
app.use("/v1/api", apiRouter)
app.use("/v1/api/clubs", clubApiRouter)
app.use("/v1/api/creates", creatorRouter)
app.use("/v1/api/games", gamesApiRouter)
app.use("/v1/api/competitions", competitionsApiRouter)
app.use("/v1/api/activities", activitiesApiRouter)

// Listen for socket connections
io.on('connection', (socket) => {
  console.log('a socket.io user connected');

  // Optional: Handle disconnect
  socket.on('disconnect', () => {
      console.log('user socket.io disconnected');
  });
});

// Export io for use in other files
module.exports = io;

// start server
server.listen(port, function listener() {
  console.log(`App is listening at http//localhost:${port}`);
});
