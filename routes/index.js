const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

const eA = require('../middleware/eA');

// Head page router
router.get('/', eA, (req, res) => {
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