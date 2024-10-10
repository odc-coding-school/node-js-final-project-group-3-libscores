var express = require('express');
var router = express.Router();
var db = require('../db'); // Import the database connection

// Route to handle search requests
router.get('/', (req, res) => {
    const searchTerm = req.query.q;

    // Prepare search parameter
    const searchParam = `%${searchTerm}%`; // SQL wildcard search

    // Queries for players, clubs, games, and competitions
    const playerQuery = `SELECT fullname, position, DOB FROM players WHERE fullname LIKE ?`;
    const clubQuery = `SELECT badge, club, country_id, squad, founded FROM clubs WHERE club LIKE ?`;
    const countyQuery = `SELECT county, flag FROM counties WHERE county LIKE ?`;
    // Game query to fetch club names using home and away club IDs
const gameQuery = `
    SELECT 
        g.start, 
        g.home_goal, 
        g.away_goal, 
        home.club AS home_club, 
        away.club AS away_club 
    FROM games g
    JOIN clubs home ON g.home = home.id
    JOIN clubs away ON g.away = away.id
    WHERE home.club LIKE ? OR away.club LIKE ?;
`;

    const competitionQuery = `SELECT competition, country_id FROM competitions WHERE competition LIKE ?`;
    

    // Results object to store all data
    let results = {
        players: [],
        clubs: [],
        counties: [],
        games: [],
        competitions: [],
        
    };

    // Query players
    db.all(playerQuery, [searchParam], (err, rows) => {
        if (err) {
            console.error('Error querying players:', err);
        } else {
            results.players = rows;
        }

        // Query clubs
        db.all(clubQuery, [searchParam], (err, rows) => {
            if (err) {
                console.error('Error querying clubs:', err);
            } else {
                results.clubs = rows;
            }

            db.all(countyQuery, [searchParam], (err, rows) => {
                if (err) {
                    console.error('Error querying games:', err);
                } else {
                    results.counties = rows;
                }

            // Query games
            db.all(gameQuery, [searchParam, searchParam], (err, rows) => {
                if (err) {
                    console.error('Error querying games:', err);
                } else {
                    results.games = rows;
                }
    

                // Query competitions
                db.all(competitionQuery, [searchParam], (err, rows) => {
                    if (err) {
                        console.error('Error querying competitions:', err);
                    } else {
                        results.competitions = rows;
                    }

                    // Render the search results page
                    res.render('search', {
                        searchTerm,
                        players: results.players,
                        clubs: results.clubs,
                        counties: results.counties,
                        games: results.games,
                        competitions: results.competitions,
                        title: 'LibScores'
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;
