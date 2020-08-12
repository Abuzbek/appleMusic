const eA = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        req.flash('danger', 'Пожалуйста введите логин и пароль');
        res.redirect('/')
    }
}

module.exports = eA;