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
    Music.findByIdAndDelete(req.params.id, (err) => {
        if (err) console.log(err);
        else {
            req.flash('success', 'Музыка успешно удалена')
            res.redirect('/index');
        }
    })
})
module.exports = router;