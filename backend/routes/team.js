const express = require("express");
const router = express.Router({mergeParams: true});
const Post = require('../models/post');
const User = require('../models/user');
const Team = require('../models/team');

/**
 * Create a team
 *
 */
router.post(
    '/post/post_id/team', async (req, res) => {
        try {
            const newTeam = new Team({
                userId: req.body.userId,
                members: req.body.interested,
                teamName: req.body.text,
                postId: req.post.id,
                tag: req.body.tag
            });

            const team = await newTeam.save();

            res.json(team);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * Delete a team with teamId
 * @param id teamId
 *
 */
router.delete('/team/delete/:teamId', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }
        await Team.remove();

        res.json({ msg: 'Team removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

/**
 * Get all InterestedUserList by postId
 * @param id userId
 */
router.get('/team/getInterestedUserList/:postId', async ({params: {postId}}, res) => {
    try {
        const userList = await Post.find({post: postId}).populate('interested',['userName']);
        res.json(userList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * Get a Team list by userID
 * @param userID
 */
router.get('/team/getTeamList/:userId', async (req, res) => {
    try {
        const teams = await User.findById(req.params.id).populate('teams', ['teamName']);

        if (!teams) {
            return res.status(404).json({ msg: 'Team not found' })
        }

        return res.json(teams);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.export = router;