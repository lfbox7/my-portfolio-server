const userSchema = require('../models/user.model');
// const User = db.user;

exports.createUser = (req, res, next) => {
    if (!req.body.userName || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    userSchema
        .create(req.body, (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log(data);
                res.json(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user."
        });
    });
};

exports.findAllUser = (req, res) => {
    const userName = req.query.userName;
    const condition = userName ? {
            userName: {
                $regex: new RegExp(userName),
                $options: 'i'
            }
        } :

        User.find(condition)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving user.'
            });
        });
};

exports.findOneUser = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(result => {
            if (!data)
                res.status(404).send({
                    message: `User with id: ${id} not found`
                });
            else
                res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving user.'
            });
        });
};

exports.updateUser = (req, res) => {
    if (!req.body.userName) {
        return res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(result => {
        if (!result)
            res.status(404).send({
                message: `User with id: ${id} not found`
            });
        else
            res.send({ message: `User with id: ${id}'s profile was updated successfully.` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Some error occurred while updating user with id: ${id}.`
        });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete usser with id: ${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Tutorial with id: ${id}.`
      });
    });
};