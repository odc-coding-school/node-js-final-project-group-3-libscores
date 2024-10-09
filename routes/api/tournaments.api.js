const express = require('express');
const { dbQuery, dbGet, dbAll, useTournamentDB, handleError } = require('@utils/dbUtils');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = await useTournamentDB();

        const tournamentQuery = `
            SELECT * FROM tournaments
        `;
        const tournaments = await dbAll(db, tournamentQuery);

        if (!tournaments || tournaments.length === 0) {
            return res.status(404).json({ message: 'No tournaments found.' });
        }

        const tournamentResults = await Promise.all(tournaments.map(async (tournament) => {
            const groupQuery    = `
                SELECT teams.id AS team_id, teams.name AS team_name, teams.badge FROM groups JOIN teams ON groups.team_id = teams.id
                WHERE tournament_id = ?
            `;
            const groups = await dbAll(db, groupQuery , [tournament.id]);

            if (groups.length === 0) {
                return tournament;
            }

           
            return {
                tournaments: tournamentResults, groups
            };
        }));

        return res.status(200).json({tournaments:tournamentResults});

    } catch (err) {
        handleError(res, err, 'Error fetching competition details.');
    }
});

module.exports = router