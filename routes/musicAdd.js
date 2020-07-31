var express = require('express');
var router = express.Router();
const Music = require('../model/Music');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('music_add', {
    title: 'Добавить',
    isAdd: true
  })
});

router.post('/', (req, res, next) => {
  req.checkBody('album', 'Альбом,').notEmpty()
  req.checkBody('singer', 'Исполнитель,').notEmpty()
  req.checkBody('name', 'Название,').notEmpty()
  req.checkBody('img', 'Фотография песня,').notEmpty()
  req.checkBody('song', 'Музыка,').notEmpty()
  req.checkBody('singerImg', 'Фотографии исполнитель,').notEmpty()
  req.checkBody('albumImg', 'Фотографии альбом.').notEmpty()

  const errors = req.validationErrors();
  if (errors) {
    res.render('music_add', {
      title: 'Ошибка',
      errors: errors,
    })
  }
  else {
    const music = new Music();
    music.name = req.body.name;
    music.singer = req.body.singer;
    music.album = req.body.album;
    music.img = req.body.img;
    music.song = req.body.song;
    music.singerImg = req.body.singerImg;
    music.albumImg = req.body.albumImg;

    music.save((err) => {
      if (err) console.log(err);
      else {
        req.flash('success', 'Музыка успешно добавлено')
        res.redirect('/')
      }
    })
  }
})

module.exports = router;
