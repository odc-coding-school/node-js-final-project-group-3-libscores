var router = require('express').Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
       let options = {
              title: "Action Center",
              page: "admin"
       }
       res.render('admin/dashboard.ejs', options);
});

module.exports = router;
