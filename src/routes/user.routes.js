const express = require('express');
const userRoutes = express.Router();
const dbo = require('../../db/conn');
const ObjectId = require('mongodb').ObjectId;

// read users
userRoutes.route('user').get((req, res) => {
  let db_connect = dbo.getDb('MERN_Stack_Boilerplate');
  db_connect
    .collection('user')
    .find({})
    .toArray((err, result) => {
      if (err) 
        throw err;
      res.json(result);
    });
});

// read user
userRoutes.route('/user/:id').get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection('users')
      .findOne(myquery, (err, result) => {
        if (err) 
            throw err;
        res.json(result);
      });
});

// create user
userRoutes.route('/user/add').post((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = {
    userName: req.body.userName,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.body.image,
    bio: req.body.bio,
    phone: req.body.phone,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    password: req.body.password,
  };
  db_connect.collection('users').insertOne(myobj, (err, res) => {
    if (err) 
        throw err;
    response.json(res);
  });
});

// update user
userRoutes.route('/update/:id').post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        userName: req.body.userName,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        bio: req.body.bio,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        password: req.body.password,
    },
  };
  db_connect
    .collection('users')
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) 
        throw err;
      console.log('1 document updated');
      response.json(res);
    });
});

// delete user
userRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection('users').deleteOne(myquery, (err, obj) => {
    if (err) 
        throw err;
    console.log('1 document deleted');
    response.status(obj);
  });
});

module.exports = userRoutes;