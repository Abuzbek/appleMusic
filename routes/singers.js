const express = require('express');
const router = express.Router();
const Music = require('../model/Music');
const eA = require('../middleware/eA');

// Head page router
router.get('/', eA, (req, res) => {
    Music.aggregate([
        { $group: { _id: { singer: '$singer', img: '$singerImg' }, total: { $sum: 1 } } },
        { $sort: { '_id.singer': 1 } },
    ], (err, singers) => {
        if (err) console.log(err);
        else {
            res.render('singers', {
                title: 'Артисты',
                singers,
                isSingers: true,
            })
        }
    })
})

module.exports = router;