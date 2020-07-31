const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

router.get('/:id', (req, res) => {
    Music.findByIdAndDelete(req.params.id, (err) => {
        if (err) console.log(err);
        else {
            req.flash('success', 'Музыка успешно удалена')
            res.redirect('/');
        }
    })
})
module.exports = router;