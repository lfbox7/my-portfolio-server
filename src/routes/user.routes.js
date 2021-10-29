const { ObjectId } = require('bson');
const express = require('express');

const User = require('../models/user.model');

const userRouter = express.Router();

userRouter.get('/user', (req, res) => {
    User.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

userRouter.get('/user/:id', (req, res) => {
    User.findById({
        _id: req.params.id
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

userRouter.post('/user/add', (req, res) => {
    
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const image = req.body.image;
    const bio = req.body.bio;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const user = {
        userName,
        email,
        password,
        image,
        bio,
        name: {
            firstName,
            lastName,
        },
        address: {
            address1,
            address2,
            city,
            state,
            zip
        }
    };
    User.find({
        email: req.body.email
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else if (result == null) {
            User.collection.insertOne(user);
        }
    });
});


module.exports = userRouter;