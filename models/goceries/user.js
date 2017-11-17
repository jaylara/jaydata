const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String
});

UserSchema.statics.createSecure = function(username, password, callback) {
    const UserModel = this;

    bcrypt.genSalt(function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            UserModel.create({
                username: username,
                passwordHash: hash
            }, callback);
        });
    });
};

UserSchema.methods.checkPassword = function(password, callback) {
    bcrypt.compare(password, this.passwordHash, callback);
};

UserSchema.statics.authenticate = function(username, password, callback) {
    this.findOne({
        username,
    }, function(err, foundUser) {
        if (!foundUser) {
            callback(new Error(`Could not find user with username: ${username}. <a href="/admin/login"> Go Back? </a>`), null);
        } else {
            foundUser.checkPassword(password, function(err, passwordsMatch) {
                if (err || !passwordsMatch) {
                    callback(new Error('Passwords did not match. <a href="/admin/login">Try Again?</a>'), null);
                } else {
                    callback(null, foundUser);
                }
            });
        }
    });
};

const User = mongoose.model('GoceriesUser', UserSchema);

// export
module.exports = User;
