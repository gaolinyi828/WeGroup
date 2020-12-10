const express = require("express");
const mongoose = require("mongoose");

const router = express.Router({mergeParams: true});
const middleware = require("../middleware");
const auth = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const secret = 'massacre';
const Post = require("../models/post");
const Team = require("../models/team");
const User = require("../models/user");

// createUser
// updateUser (update different fields can have different functions)
// getUser

/**
 * Create a new user and save to database
 *
 * @param username
 * @param password
 * @param avatar
 *
 * @return status 400 if input is invalid
 *         status 201 with new user object
 */

router.post('/users/signup', (req, res) => {
    const user = new User({
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        avatar: req.body.avatar
    });
    user.save((err, user) => {
        if (err) {
            console.log(err)
            res.status(400).send("invalid input");
        } else {
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, secret, { expiresIn: '1h'}, (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            });
        }
    })
});


/**
 * Update a user with the userId and new information
 *
 * @param userId the user id
 * @param username
 * @return status 404 if not found
 *         status 200 with user object
 */
// update a user
router.put('/users/update', async (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body.userName, (err, userName, userPassword, avatar) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send("update complete");
        }
    });
})


/**
 * Get the user information by user id
 *
 * @param  userId the ser id to search
 * @return status 404 if not found
 *         status 200 with user object
 */

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(404).send("user not found");
        } else {
            res.status(200).send(user);
        }
    })
});


module.exports = router;