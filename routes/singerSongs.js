// const express = require('express');
// const router = express.Router();
// const Music = require('../model/Music');

// // Head page router
// router.get(`/`, (req, res) => {
//     Music.aggregate([
//         { $group: { _id: { singer: '$singer', img: '$singerImg', ID: '$singerID' }, total: { $sum: 1 } } },
//         { $sort: { singer: 1 } }
//     ], (err, songs) => {
//         if (err) console.log(err);
//         else {
//             console.log(songs);
//             res.render('singerSongs', {
//                 title: 'Музыки',
//                 songs,
//             })
//         }
//     })
// })

// module.exports = router;