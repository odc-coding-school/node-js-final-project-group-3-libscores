const express = require('express');
const db = require('../db'); // Import your db.js file
const router = express.Router();

// Route to get match info by home team, away team, and match year
router.get('/match_info/:home_team/:away_team', (req, res) => {
    const homeTeam = req.params.home_team.replace(/%20/g, ' '); // Replace %20 with spaces
    const awayTeam = req.params.away_team.replace(/%20/g, ' '); // Replace %20 with spaces

    // SQL query to get match information along with team logos from the clubs table
    const query = `
        SELECT 
            m.date,
            m.score,
            c1.badge AS home_team_logo,
            c1.club AS home_team_name,
            c2.badge AS away_team_logo,
            c2.club AS away_team_name
        FROM games m
        JOIN clubs c1 ON m.home = c1.id
        JOIN clubs c2 ON m.away = c2.id
        WHERE c1.club = ? AND c2.club = ? AND strftime('%Y', m.date) = ?
    `;

    db.all(query, [homeTeam, awayTeam], (err, rows) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            res.status(500).send('Database error');
            return;
        }

        if (rows.length === 0) {
            res.status(404).send('Match not found');
            return;
        }

        // Assuming you want the first row for match details
        const matchInfo = rows[0];

        res.render('match-info', {
            home_team_logo: matchInfo.home_team_logo,
            home_team_name: matchInfo.home_team_name,
            away_team_logo: matchInfo.away_team_logo,
            away_team_name: matchInfo.away_team_name,
            match_date: matchInfo.date,
            score: matchInfo.score,
            capacity: '1,500' // Adjust or retrieve this value as needed
        });
    });
});

module.exports = router;
