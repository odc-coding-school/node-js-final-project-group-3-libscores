var router = require('express').Router()
var sqlite3 = require("sqlite3").verbose();
var getDbInstance = require('@js/getDBInstance');
var db = getDbInstance(sqlite3)
const upload = require('@middleware/upload');


router.get('/', function(req, res, next) {
    res.render('dashboard/competition.dash.ejs', { title: 'Manage Competition' });
});

router.get('/:id', async function(req, res, next) {
       let {id} = req.params
       if(id) {
              db.all("SELECT * FROM competitions WHERE id=?",[id], function (err, rows) {
                     if(err || rows.length == 0) {
                            res.render('dashboard/competition.info.ejs', 
                                   {title: "competition doesn't exist",  error:err, 
                                   msg: "competition doesn't exist", competition: null})
                     } else {
                            let competition = rows[0]
                            res.render('dashboard/competition.info.ejs', { title: competition.competition, competition });
                     }
              });
       } else {
              res.redirect('/dashboard/competitions')
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
