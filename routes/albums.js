const express = require('express');
const router = express.Router();
const Music = require('../model/Music');
const eA = require('../middleware/eA');

// Head page router
router.get('/', eA,(req, res) => {
    Music.aggregate([
        { $group: { _id: { album: '$album', img: '$albumImg' }, total: { $sum: 1 } } },
        { $sort: { '_id.singer': 1 } },
    ], (err, albums) => {
        if (err) console.log(err);
        else {
            res.render('albums', {
                title: 'Альбомы',
                albums,
                isAlbums: true,
            })
        }
    })
})

module.exports = router;