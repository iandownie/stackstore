'use strict';

/* 

1. Unauthenticated Users

>>> Account Management <<<

Create an Account
Login with Facebook and/or Google

2. Authenticated Users

>>> Account Management <<<

View Past Order List
View Order Detail
Current Order Status
Items with Quantity and Subtotal
Link to the original Product Detail Page
Date/Time Order was created
Product Reviews
Leave a Review (with a 5-star rating) for a Product

3. Admin Users

>>> User Management <<<

Admin Users can promote other User accounts to also having Admin status
Change the password of any user

4. Data Validations

>>> USERS <<<

Users must have a valid email address
Users email must be unique

*/

var crypto = require('crypto');
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String
    },
    password: {
        type: String
    },
    store: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Store'
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Order'
    }],
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
}, { collection: 'users', discriminatorKey : '_type' });



// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();
});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;
schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

var AdminSchema = schema.extend({
    powerful: {type: Boolean, default: true}
})
schema.statics.getProperLoginType = function(id){
        Admin.findById(id, function (err, admin){
        if (err) {
            console.error(err);
            User.findById(id, function (err, user){
                if (err) console.error(err);
               return user;
            });
        } else {
            return admin;
        }
    });
};
mongoose.model('User', schema);
mongoose.model('Admin', AdminSchema);