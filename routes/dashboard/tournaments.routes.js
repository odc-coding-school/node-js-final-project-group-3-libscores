var router = require('express').Router();
const upload = require('@middleware/upload');
const { dbQuery, dbRun, dbGet,dbAll, useTournamentDB  } = require('@utils/dbUtils');

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


// POST route to save a new competition (league)
router.post('/', upload.single('badge'), async (req, res) => { // Changed the path to '/'
  const { name, host, start, end, } = req.body;
  const badge = req.file ? req.file.filename : null;

  if (!name || !host || !start || !end) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
      const db = await useTournamentDB();
      const sql = `INSERT INTO tournaments VALUES (?,?,?, ?, ?, ?, ?, ?,?)`;
      const values = [null, name, badge, host, start, end,null, null, null];

      const lastID = await dbRun(db, sql, values);

      
      // Fetch the newly inserted league to send back to the frontend
      const newTournament = await dbQuery(db, `SELECT * FROM tournaments WHERE id = ?`, [lastID]);

      // Send the newly created league back as a response
      res.status(201).json({ tournament: newTournament });
  } catch (err) {
      console.error('Error saving tournament:', err);
      res.status(500).json({ message: 'An error occurred while saving the tournament.' });
  }
});

router.get('/:id', async function(req, res, next) {
  let options = { title: 'Tournaments Dashboard', league: "tournaments" }
  
  try {
    const db = await useTournamentDB();
    let { id } = req.params
    const tournamentQuery = `SELECT * FROM tournaments WHERE id = ?`;
    const tournament = await dbGet(db, tournamentQuery, [id]);

    if (!tournament || tournament.length === 0) {
        return res.status(404).json({ message: 'No tournament found.' });
    }
    options.tournament = tournament

        const groupQuery    = `
            SELECT teams.id AS team_id, teams.name AS team_name, teams.badge FROM groups JOIN teams ON groups.team_id = teams.id
            WHERE tournament_id = ?
        `;
        const groups = await dbAll(db, groupQuery , [id]);
        options.groups = groups 

       res.render('dashboard/tournaments.info.ejs', options);
  } catch (err) {
    options.err = err
    res.render('dashboard/tournaments.info.ejs', options);
  }
});

module.exports = router;
