const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const userSchema = new schema({
    userName: {
        type: String,
        required: [true, "cannot be blank"],
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        required: [true, "cannot be blank"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    image: {
        type: String
    },
    bio: { 
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash == hash;
};

userSchema.methods.generateJWT = () => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        userName: this.userName,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

userSchema.methods.toAuthJSON = () => {
    return {
        userName: this.userName,
        email: this.email,
        token: this.generateJWT(),
        image: this.image,
        bio: this.bio,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
    };
};

module.exports = mongoose.model('User', userSchema);