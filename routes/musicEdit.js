const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

// Music edit page ById
router.get('/:id', (req, res) => {
    Music.findById(req.params.id, (err, music) => {
        res.render('musicEdit', {
            music: music,
            title: 'Редактировать',
        })
    })
})

// Music edit page ById with post method
router.post('/:id', (req, res) => {
    const music = {}
    music.name = req.body.name
    music.singer = req.body.singer
    music.album = req.body.album
    music.img = req.body.img
    music.song = req.body.song
    music.singerImg = req.body.singerImg;
    music.albumImg = req.body.albumImg;

    const query = { _id: req.params.id }
    Music.updateOne(query, music, (err) => {
        if (err) console.log(err);
        else {
            req.flash('success', 'Музыка успешно редактировано')
            res.redirect('/');
        }
    })
})

module.exports = router;