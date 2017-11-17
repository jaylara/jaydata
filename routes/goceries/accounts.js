const User = require('../../models/goceries/user');

function getLoginPage(req, res) {
    res.render('admin');
}

function getLogoutPage(req, res) {
    req.session.userId = null;
    res.redirect('/admin/login');
}

function getProfilePage(req, res) {
    User.findOne({
        _id: req.session.userId
    }, function(err, currentUser) {
        res.render('adminHome', {
            user: currentUser
        });
    });
}

function registerNewUser(req, res) {
    User.createSecure(req.body.username, req.body.password, function(err, savedUser) {
        if (err) {
            res.status(500).send('Something went wrong. ' + '<a href="/admin/login">Go Back?</a>');
        } else {
            req.session.userId = savedUser._id;
            res.redirect('/admin/panel');
        }
    });
}

function newLoginSession(req, res) {
    User.authenticate(req.body.username, req.body.password, function(err, user) {
        if (err) {
            res.status(400).send(`Error processing login: ${err.message}`);
        } else {
            req.session.userId = user._id;
            res.redirect('/admin/panel');
        }
    });
}

module.exports = {
    getLoginPage,
    registerNewUser,
    newLoginSession,
    getLogoutPage,
    getProfilePage
};
