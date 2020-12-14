const express = require("express");
const router = express.Router({mergeParams: true});
const Post = require('../models/post');
const User = require('../models/user');
const Team = require('../models/team');

/**
 * Create a team
 *
 */
router.post('/', (req, res) => {
    const newTeam = new Team({
        userId: req.body.userId,
        members: req.body.members,
        teamName: req.body.teamName,
        postId: req.body.postId,
        tag: req.body.tag,
    });
    newTeam.save((err, newTeam) => {
        if (err) {
            console.log(err);
            res.status(400).send("invalid input");
        } else {
            let people = newTeam.members;
            people.push(req.body.userId);
            people.forEach(element => {
                User.findById(element, (err, user) => {
                    if (err) {
                        res.status(404).send("Something went wrong");
                    } else {
                        user.teams.push(newTeam);
                        user.save();
                    }
                });
            });
            res.status(200).send("Successfully create team");
        }
    });
});

/**
 * Delete a team with teamId
 * @param id teamId
 *
 */
router.delete('/delete/:teamId', (req, res) => {
    Team.findById(req.params.id, (err, team) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            team.members.forEach(element => {
                User.findById(element, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(404).send("Something went wrong");
                    } else {
                        let i = user.teams.indexOf(team);
                        user.teams.splice(i, 1);
                        user.save();
                    }
                });
            });
        }
    })
    Team.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("Delete failure");
        } else {
            res.status(200).send("Successfully delete");
        }
    });
});

/**
 * Get all InterestedUserList by postId
 * @param id userId
 */
router.get('/interestedUserList/:postId', (req,res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            console.log(err);
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(post.interested);
        }
    });
});

/**
 * Get a Team list by userID
 * @param userID
 */
router.get('/getTeamList/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(user.teams);
        }
    });
});

/**
 * Get a list of teams with given ids
 *
 * @param id team ids
 * @return status 404 if fail to get
 *         status 200 if successfully get
 */
router.post('/ids', (req, res)=> {
    let ids = [...new Set(req.body)];
    Team.find({'_id': { $in: ids}}, (err, items) => {
        if (err) {
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(items);
        }
    });
});

module.exports = router;
