var User = require('../models/user')

exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}

exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}

exports.signup = function(req, res) {
    var _user = req.body.user
    User.findOne({name:_user.name}, function(err, user) {
        if(err) {
            console.log(err)
        }
        if(user) {
            res.redirect('/signin')
        }
        else {
            var user = new User(_user)
            user.save(function(err, user) {
                if(err) {
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    }) 
}

exports.signin = function(req, res) {
    var _user = req.body.user
    User.findOne({name: _user.name}, function(err, user) {
        if(err) console.log(err)
        if(!user) {
            return res.redirect('/signup')
        } 
        user.comparePassword(_user.password, function(err, isMatch) {
            if(err) console.log(err)
            if(isMatch) {
                req.session.user = user
                return res.redirect('/')
            } else {
                console.log('password not matched')
                return res.redirect('/signin')
            }
        })
    })
}

// logout
exports.logout = function(req, res) {
    delete req.session.user
    //delete app.locals.user

    res.redirect('/')
}

// midware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user

    if(!user) {
        return res.redirect('/signin')
    }

    next()
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user

    if(user.role <= 10) {
        return res.redirect('/signin')
    }

    next()
}

exports.showResume = function(req, res) {
    var _user = req.session.user
    User.findOne({name:_user.name}, function(err, user) {
        if(err) {
            console.log(err)
        }
        if(user) {
            res.render('resume', {
                title: user.name + '的简历',
                user: user
            })
        }
    })
}