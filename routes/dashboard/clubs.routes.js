var router = require('express').Router()
var sqlite3 = require("sqlite3").verbose();
var getDbInstance = require('@js/getDBInstance');
var db = getDbInstance(sqlite3)
const upload = require('@middleware/upload');


router.get('/', function(req, res, next) {
    res.render('dashboard/clubs.dash.ejs', { title: 'Manage Clubs' });
});

router.get('/:id', async function(req, res, next) {
       let {id} = req.params
       if(id) {
              db.all("SELECT * FROM clubs WHERE id=?",[id], function (err, rows) {
                     if(err || rows.length == 0) {
                            res.render('dashboard/club.info.ejs', 
                                   {title: "Club doesn't exist",  error:err, 
                                   msg: "Club doesn't exist", club: null})
                     } else {
                            let club = rows[0]
                            res.render('dashboard/club.info.ejs', { title: club.club, club });
                     }
              });
       } else {
              res.redirect('/dashboard/clubs')
       }
      
   });


router.post('/', upload.single("badge"), async function(req, res, next) {
    let options = {
        title: "Manage Clubs"
    }
    console.log(req.body)

    try {
           let badge = req.file.filename
           let{club,founded,country,stadium,value}= req.body
           db.run(
           "INSERT INTO clubs VALUES (?,?,?,?,?,?,?,?)",
           [null,club,founded, country,null,stadium,value,badge],
           function (err) {
                  if(err) {
                         throw new Error(err);
                  } else {
                         res.render('dashboard/clubs.dash.ejs', options);
                  }
           }
           );
    } catch (error) {
           res.status(400).json({error})
    }
});


module.exports = router;
