const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

/**
 * TODO: Modify API routes
 */

router.get('/user/:id', auth.required, (req, res, next) => {
  User.findById(req.params.id, (error, post) => {
    if (error) {
      return next(error);
    }
    if (!post) 
      return res.sendStatus(401);
    return res.json({user: post.toAuthJSON()});
  }).catch(next);
});

router.put('/user/:id', auth.required, (req, res, next) => {
  User.findById(req.params.id, req.body, (error, post) => {
    if (!post) 
      return res.sendStatus(401);
    // TODO: Add additional fields from model
    if (typeof req.body.user.username !== 'undefined')
      post.username = req.body.user.username;
    if (typeof req.body.user.email !== 'undefined')
      post.email = req.body.user.email;
    if (typeof req.body.user.bio !== 'undefined')
      post.bio = req.body.user.bio;
    if (typeof req.body.user.image !== 'undefined')
      post.image = req.body.user.image;
    if (typeof req.body.user.password !== 'undefined')
      post.setPassword(req.body.user.password);
    return post.save().then(() => {
      return res.json({user: post.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', (req, res, next) => {
  if (!req.body.user.email)
    return res.status(422).json({errors: {email: "can't be blank"}});
  if (!req.body.user.password)
    return res.status(422).json({errors: {password: "can't be blank"}});
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    if (user) {
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else
      return res.status(422).json(info);
  })(req, res, next);
});

router.post('/users/register', (req, res, next) => {
  var user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.save().then(() => {
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.delete('/user/:id', auth.required, (req, res, next) => {
  User.findByIdAndRemove(req.params.id, req.body, (error, post) => {
    
  });
});

module.exports = router;
