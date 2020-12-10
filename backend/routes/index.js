const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';


/**
 * Login a user
 *
 * @param email
 * @param password
 * @return status 500 if something wrong with server
 *         status 401 if incorrect username or password
 */
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'Internal error please try again'});
        } else if (!user) {
            res.status(401).json({error: 'Incorrect username or password'});
        } else {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    res.status(500).json({error: 'Internal error please try again'});
                } else if (!match) {
                    res.status(401).json({error: 'Incorrect username or password'});
                } else {
                    const payload = {
                        user: {
                            id: user.id
                        }
                    };
                    jwt.sign(payload, secret, {expiresIn: '1h'}, (err, token) => {
                        if (err) throw err;
                        res.json({token, user});
                    });
                }
            });
        }
    })
});

/**
 * Create a new user and save to database
 *
 * @param username
 * @param password
 * @return status 400 if input is invalid
 *         status 201 with new user object
 */
router.post('/signup', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
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
            jwt.sign(payload, secret, {expiresIn: '1h'}, (err, token) => {
                if (err) throw err;
                res.json({token, user});
            });
        }
    })
});

module.exports = router;
