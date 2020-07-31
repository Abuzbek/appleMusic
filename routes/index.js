const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

// Head page router
router.get('/', (req, res) => {
    Music.find({}, (err, musics) => {
        if (err) console.log(err);
        else {
            res.render('index', {
                title: 'Музыки',
                musics,
                isHead: true
            })
        }
    })
})

module.exports = router;