var router = require('express').Router();

router.get('/', async function(req, res, next) {
       res.render('admin/fd-admin.ejs', {title: "Update First Division League"});
});

module.exports = router;
