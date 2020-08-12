const express = require('express');
const router = express.Router();
const Music = require('../model/Music');
const eA = require('../middleware/eA');

router.get('/:id', eA, (req, res) => {
    Music.findByIdAndDelete(req.params.id, (err) => {
        if (err) console.log(err);
        else {
            req.flash('success', 'Музыка успешно удалена')
            res.redirect('/index');
        }
    })
})
module.exports = router;