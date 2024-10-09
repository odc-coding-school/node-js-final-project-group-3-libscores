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



module.exports = router;
