var express = require('express');
var router = express.Router();
var db = require('../db'); // Import the database connection

// Route to handle search requests
router.get('/', (req, res) => {
    const searchTerm = req.query.q;

    // Prepare search parameter
    const searchParam = `%${searchTerm}%`; // SQL wildcard search

    // Queries for players, clubs, games, and competitions
    const playerQuery = `SELECT fullname, club, position, DOB FROM players WHERE fullname LIKE ? OR club LIKE ? OR position LIKE ?`;
    const clubQuery = `SELECT club, country_id, founded FROM clubs WHERE club LIKE ?`;
    const gameQuery = `SELECT home, away, date, score FROM games WHERE home LIKE ? OR away LIKE ?`;
    const competitionQuery = `SELECT competition, country_id, season FROM competitions WHERE competition LIKE ?`;

    // Results object to store all data
    let results = {
        players: [],
        clubs: [],
        games: [],
        competitions: []
    };

    // Query players
    db.all(playerQuery, [searchParam, searchParam, searchParam], (err, rows) => {
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
                        games: results.games,
                        competitions: results.competitions,
                        title: 'LibScores'
                    });
                });
            });
        });
    });
});

module.exports = router;
