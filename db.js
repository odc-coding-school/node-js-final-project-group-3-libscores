const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Correct path to leagues.db
const dbPath = path.join(__dirname, 'databases', 'leagues.db');  
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the leagues.db database.');
    }
});

module.exports = db;
