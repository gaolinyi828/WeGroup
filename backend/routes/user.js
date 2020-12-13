const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';
const auth = require('../middleware/auth');

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

/**
 * Get the user information by token
 *
 * @param token
 * @return status 500 if something wrong with server
 *         status 401 if incorrect email or password
 */
router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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
router.put('/update', async (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {userName: req.body.userName, userPassword: req.body.userPassword, avatar: req.body.avatar}, (err, user) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(user);
        }
    });
})

/**
 * Get a list of users with given ids
 *
 * @param id user ids
 * @return status 404 if fail to get
 *         status 200 if successfully get
 */
router.post('/ids', (req, res)=> {
    let ids = [...new Set(req.body)];
    User.find({'_id': { $in: ids}}, (err, items) => {
        if (err) {
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(items);
        }
    });
});

/**
 * Get the user with user id
 *
 * @param user id
 * @return status 404 if fail to get
 *         status 200 if successfully get
 */
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(user);
        }
    });
})

module.exports = router;
