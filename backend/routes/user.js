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
 * Update a user with the userId and new information
 *
 * @param userId the user id
 * @param userName the user's name
 * @param userPassword the user's password
 * @param avatar the user's avatar
 * @return status 404 if not found
 *         status 200 with user object
 */
// update a user
router.put('/users/update', async (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {userName: req.body.userName, userPassword: req.body.userPassword, avatar: req.body.avatar}, (err, user) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(user);
        }
    });
})


/**
 * Get the user information by user id
 *
 * @param  userId the user id to search
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


module.export = router;