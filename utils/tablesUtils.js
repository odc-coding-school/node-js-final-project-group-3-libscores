const { useLeaguesDB, useTournamentDB } = require("./dbUtils");

function createLeagueTables() {
    let db = useLeaguesDB()
    db.serialize(function() {
      
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
      
}
function createTournamentTables() {
    let db = useTournamentDB()
    db.serialize(function() {
      
      });
      
}

module.exports = {createLeagueTables, createTournamentTables}