var router = require('express').Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
       let options = {
              title: "Contributor Dashboard",
              page: "admin"
       }
       res.render('admin/dashboard.ejs', options);
});

module.exports = router;
