var router = require('express').Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
       res.render('admin/cm-admin.ejs', {title: "Update County Meet"});
});

module.exports = router;
