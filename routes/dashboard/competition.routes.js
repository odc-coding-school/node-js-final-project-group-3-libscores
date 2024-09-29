const { getItemById } = require('@js/dbService');
const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const getDbInstance = require('@js/getDBInstance');
const upload = require('@middleware/upload');

// Utility function for database queries
const dbQuery = (db, query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

// Utility function for running insert queries
const dbRun = (db, query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if (err) return reject(err);
            resolve(this);
        });
    });
};

// GET route to display the competitions (leagues) page
router.get('/', async (req, res) => {
       try {
           const db = await getDbInstance(sqlite3);
           const query = 'SELECT * FROM competitions ORDER BY id DESC';
           const leagues = await dbQuery(db, query);
   
           // Check if leagues array is empty
           if (!leagues.length) {
               return res.render('dashboard/competition.dash.ejs', {
                   title: 'Leagues and Competitions',
                   leagues: [], // Pass empty array for leagues
                   message: 'No leagues or competitions found.' // Pass the message
               });
           }
   
           res.render('dashboard/competition.dash.ejs', {
               title: 'Leagues and Competitions',
               leagues // Pass the fetched leagues
           });
       } catch (err) {
           console.error('Error fetching leagues:', err);
           res.status(500).render('dashboard/competition.dash.ejs', {
               title: 'Leagues and Competitions',
               leagues: [], // Pass empty array for leagues
               message: 'An error occurred while fetching competitions. Please try again later.' // Pass the error message
           });
       }
   });
   

// GET route to fetch competition details by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.redirect('/competitions'); // Updated redirect path
    }

    try {
        const competition = await getItemById('competitions', id);

        if (!competition) {
            return res.render('dashboard/competition.info.ejs', {
                title: "Competition Doesn't Exist",
                error: null,
                msg: "Competition doesn't exist.",
                competition: null
            });
        }

        res.render('dashboard/competition.info.ejs', {
            title: competition.competition,
            competition
        });
    } catch (err) {
        console.error('Error fetching competition:', err);
        res.status(500).render('dashboard/competition.info.ejs', {
            title: "Error Fetching Competition",
            error: err,
            msg: "An error occurred while fetching the competition. Please try again later.",
            competition: null
        });
    }
});

// POST route to save a new competition (league)
router.post('/', upload.single('logo'), async (req, res) => { // Changed the path to '/'
    const { league, founded, continent, country, market_value, type} = req.body;
    const logo = req.file ? req.file.filename : null;
    const players = 0

    if (!league || !founded || !continent || !country || !market_value) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const db = await getDbInstance(sqlite3);
        const sql = `INSERT INTO competitions VALUES (?,?,?, ?, ?, ?, ?, ?,?)`;
        const values = [null, league, country, players, market_value, continent,logo, founded, type];

        const result = await dbRun(db, sql, values);
        
        // Fetch the newly inserted league to send back to the frontend
        const newLeague = await dbQuery(db, `SELECT * FROM competitions WHERE id = ?`, [result.lastID]);

        // Send the newly created league back as a response
        res.status(201).json({ league: newLeague });
    } catch (err) {
        console.error('Error saving league:', err);
        res.status(500).json({ message: 'An error occurred while saving the league.' });
    }
});

module.exports = router;
