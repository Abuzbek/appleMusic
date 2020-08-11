const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

const eA = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        req.flash('danger', 'please login the page');
        res.redirect('/')
    }
}

router.get('/:id', eA, (req, res) => {
    Music.findById(req.params.id, (err, music) => {
        res.render('musics', {
            music: music,
            title: music.name + ' - ' + music.singer,
        })
    })
})

module.exports = router;