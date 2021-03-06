const express = require('express');
const router = express.Router();
const User = require('../model/User');
const upload = require('../middleware/file')
const toDeleteFile = require('../utils/toDelete');
const eA = require('../middleware/eA');


// Music edit page ById
router.get('/:id', eA, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        res.render('accountEdit', {
            user: user,
            title: 'Редактировать аккаунт',
        })
    })
})

// Music edit page ById with post method
router.post('/:id', upload.single('accountImg'), async (req, res) => {
    try {
        let user = {
            name: req.body.name,
        }

        const account = await User.findById(req.params.id)


        if (account.accountImg) {
            toDeleteFile(account.accountImg);
        }
        console.log(req.file);
        if (req.file) {
            user.accountImg = '/images/' + req.file.filename
        }

        const query = { _id: req.params.id }
        User.updateOne(query, user, (err) => {
            if (err) console.log(err);
            else {
                req.flash('success', 'Аккаунт успешно редактировано')
                res.redirect('/index');
            }
        })
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;