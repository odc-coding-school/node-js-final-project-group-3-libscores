var express = require('express');
const upload = require('../middleware/upload');
var router = express.Router();


router.get('/?', function(req, res, next) {
    console.log(req)

    res.render('first-division', 
        { 
            title: 'Orange First Division League', 
            logo: "/images/league_1.png",
            league: "l1",
            page: "first_division"
        }
    );
});

// router.get("/?", function(req, res, next) {
//     console.log(req.query)
//     res.render('first-division', 
//         { 
//             title: 'Orange First Division League', 
//             logo: "/images/league_1.png",
//             param: req.query,
//             league: "l1",
//             page: "first_division"
//         }
//     )
// })

module.exports = router;
