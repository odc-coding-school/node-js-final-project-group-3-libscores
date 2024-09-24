var router = require('express').Router();

router.get('/', async function(req, res, next) {
       res.render('admin/sd-admin.ejs', {title: "Update Second Division League"});
});

module.exports = router;
