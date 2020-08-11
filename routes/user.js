const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../model/User');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Зарегистрироваться',
        value: {
            name: req.body.name,
            username: req.body.username,
        }
    })
})


router.post('/register', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    const condidate = await User.findOne({ username })

    req.checkBody('name', 'Имя,').notEmpty()
    req.checkBody('username', 'Логин,').notEmpty()
    req.checkBody('password', 'Пароль,').notEmpty()
    req.checkBody('password', 'Минимальная длинна названия 5 символа,').len(5)
    req.checkBody('password2', 'Пароли должны совпадать').equals(req.body.password).notEmpty()

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors,
            title: 'Зарегистрироваться',
            value: {
                name: name,
                username: username,
            }
        })
    }
    if (condidate) {
        req.flash('danger', 'Пользователь с таким логин уже существует'),
            res.redirect('/register')
    }

    else {
        const newUser = new User({
            name: name,
            username: username,
            password: password,
            password2: password2,
        })
        bcrypt.genSalt(10, (err, pass) => {
            bcrypt.hash(newUser.password, pass, (err, hash) => {
                if (err) console.log(err);
                newUser.password = hash
                newUser.save((err) => {
                    if (err) console.log(err);
                    else {
                        req.flash('success', 'Аккаунт добавлено');
                        res.redirect('/');
                    }
                })
            })
        })
    }
})

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Войти'
    })
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;