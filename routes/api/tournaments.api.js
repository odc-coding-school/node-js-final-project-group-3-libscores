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
                groups
            };
        }));

        return res.status(200).json({tournaments:tournamentResults});

    } catch (err) {
        handleError(res, err, 'Error fetching competition details.');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const db = await useTournamentDB();
        let { id } = req.params;

        const tournamentQuery = `
            SELECT * FROM tournaments WHERE id = ?
        `;
        const tournament = await dbGet(db, tournamentQuery, [id]);

        if (!tournament || tournament.length === 0) {
            return res.status(404).json({ message: 'No tournament found.' });
        }

        // Fetch teams and their groups for the tournament
        const groupQuery = `
            SELECT 
                groups.name AS group_name, 
                teams.id AS team_id, 
                teams.name AS team_name, 
                teams.badge 
            FROM groups 
            JOIN teams ON groups.team_id = teams.id
            WHERE groups.tournament_id = ?
        `;
        const groupResults = await dbAll(db, groupQuery, [id]);

        // Group teams by group name
        const groups = groupResults.reduce((acc, group) => {
            const { group_name, team_id, team_name, badge } = group;

            if (!acc[group_name]) {
                acc[group_name] = [];
            }
            
            acc[group_name].push({
                team_id,
                team_name,
                badge
            });

            return acc;
        }, {});

        return res.status(200).json({ tournament, groups });

    } catch (err) {
        handleError(res, err, 'Error fetching competition details.');
    }
});



module.exports = router