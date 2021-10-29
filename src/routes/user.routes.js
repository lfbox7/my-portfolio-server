const {
    application
} = require('express');
const express = require('express');
const users = require('../controllers/user.controller');

const userRouter = express.Router();

module.exports = app => {

    // Create new user
    userRouter.post('/', users.createUser);

    // Retrieve all users
    userRouter.get('/', users.findAllUser);

    // Retrieve a single user by id
    userRouter.get('/:id', users.findOneUser);

    // Update a user by id
    userRouter.put('/:id', users.updateUser);

    // Delete a user by id
    userRouter.delete('/:id', users.deleteUser);

    app.use('api/user', router);
};
