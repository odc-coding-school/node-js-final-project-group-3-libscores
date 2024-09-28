var router = require('express').Router()
var sqlite3 = require("sqlite3").verbose();
var getDbInstance = require('@js/getDBInstance');
var db = getDbInstance(sqlite3)

router.get('/', async function(req, res, next) {
    try {
        db.all("SELECT * FROM clubs", function (err, rows) {
            if(err) {
                    throw new Error(err);
            } else {
                    res.json({clubs: rows})
            }
            });
        } catch (error) {
            res.json({error, msg: "No club found."})
        }
});
router.get('/:id', async function(req, res, next) {
    let {id} = req.params
    try {
    db.all("SELECT * FROM clubs WHERE id=?",[id], function (err, rows) {
           if(err || rows.length == 0) {
                  throw new Error(err);
           } else {
                  res.status(200).json({club: rows, msg: false})
           }
           });
    } catch (error) {
           res.status(400).json({error, msg: "Club doesn't exist"})
    }
});

module.exports = router;
