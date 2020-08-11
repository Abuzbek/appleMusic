var express = require('express');
var router = express.Router();
const Music = require('../model/Music');

const eA = (req, res, next) => {
  if(req.isAuthenticated()){
    next()
  }
  else{
    req.flash('danger', 'please login the page');
    res.redirect('/')
  }
}

/* GET users listing. */
router.get('/', eA, (req, res, next) => {
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
  // req.checkBody('singerID', 'ID исполнителя,').notEmpty()
  // req.checkBody('albumID', 'ID альбома').notEmpty()

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
    // music.singerID = req.body.singerID;
    music.albumImg = req.body.albumImg;
    // music.albumID = req.body.albumID;

    music.save((err) => {
      if (err) console.log(err);
      else {
        req.flash('success', 'Музыка успешно добавлено')
        res.redirect('/index');
      }
    })
  }
})

module.exports = router;