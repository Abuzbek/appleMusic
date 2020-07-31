const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

router.get('/:id', (req, res) => {
    Music.findById(req.params.id, (err, music) => {
        res.render('musics', {
            music: music,
            title: music.name + ' - ' + music.singer,
        })
    })
})

module.exports = router;