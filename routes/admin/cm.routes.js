var router = require('express').Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
       let options = {
              title: "Update County Meet",
              page: "cm"
       }
       res.render('admin/cm-admin.ejs', options);
});

module.exports = router;
