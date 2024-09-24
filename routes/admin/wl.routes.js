var router = require('express').Router();

router.get('/', async function(req, res, next) {
       res.render('admin/wl-admin.ejs', {title: "Update Women League"});
});

module.exports = router;
