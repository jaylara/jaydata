const HomeUser = require('../../models/goceries/user');

function getLoginPage(req, res) {
    res.render('login');
}

function getLogoutPage(req, res) {
    req.session.userId = null;
    res.redirect('/home/login');
}

function getProfilePage(req, res) {
    HomeUser.findOne({
        _id: req.session.userId
    }, function(err, currentUser) {
        res.render('storefront', {
            user: currentUser
        });
    });
}

function registerNewUser(req, res) {
    HomeUser.createSecure(req.body.username, req.body.password, req.body.firstName, req.body.lastName, function(err, savedUser) {
        if (err) {
            res.status(500).send('Something went wrong. ' + '<a href="/home/login">Go Back?</a>');
        } else {
            req.session.userId = savedUser._id;
            res.redirect('/home/panel');
        }
    });
}

function newLoginSession(req, res) {
    HomeUser.authenticate(req.body.username, req.body.password, function(err, user) {
        if (err) {
            res.status(400).send(`Error processing login: ${err.message}`);
        } else {
            req.session.userId = user._id;
            res.redirect('/home/panel');
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
