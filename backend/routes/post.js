const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

/**
*   CREATE - add a new post to DB
 *
*   @return status 400 if invalid input
 *         status 201 with a new item added
*/
router.post('/post', (req, res) => {
    // get data from request
    const userId = req.body.userId;
    const tag = req.body.tag;
    const teamSize = req.body.teamSize;
    const createdAt = new Date();
    const comments = req.body.comments;
    const interested = req.body.interested;
    const text = req.body.text;
    const newPost = new Post({
        userId: userId,
        tag:tag,
        teamSize: teamSize,
        createdAt: createdAt,
        comments: comments,
        interested:interested,
        text: text
    });

    newPost.save((err, newPost) => {
        if (err) {
            console.log(err);
            res.status(400).send("invalid input");
        } else {
            console.log(userId);
            User.findOneAndUpdate({_id:userId}, {"$push": {"postsCreatedByUser": newPost._id}}, (err, newUser) => {
                if (err) {
                    res.status(404).send("Something went wrong");
                } else {
                    res.status(200).send(newUser);
                }
            });
        }
    });
});

/**
 * Update a post
 *
 * @param postId  post to update
 * @param user_id user who buy the item
 * @return status 404 if something went wrong
 *         status 200 with item objects
 */

router.put('/post/update/:postId',  (req, res) => {
    var postId = req.params.postId;
    Post.findByIdAndUpdate(postId, {text: req.body.text}, (err, post) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(post);
        }
    });
});

/**
 * Delete a post with given PostId
 *
 * @param id post Id to delete
 * @return status 404 if fail to delete
 *         status 200 if successfully delete
 */
router.delete('/post/delete/:postId', (req, res)=> {
    Post.findByIdAndDelete(req.params.postId, (err, post) => {
        if (err) {
            res.status(404).send("Delete failure");
        } else {
            console.log(post);
            User.findOneAndUpdate({_id:post.userId}, {"$pull": {"postsCreatedByUser": post._id}}, (err, newUser) => {
                if (err) {
                    res.status(404).send("Something went wrong");
                } else {
                    res.status(200).send(newUser);
                }
            });
            res.status(200).send("Successfully delete");
        }
    });
});

/**
 * Get all post by the userId
 *
 * @param id userId to find posts
 * @return status 404 if something went wrong
 *         status 200 with posts
 */
router.get('/post/byUser/:id', (req, res) => {
    Post.find({userId: req.params.id}, (err, posts) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(posts);
        }
    });
});

/**
 * Get all post by a tag
 *
 * @param tag to find posts
 * @return status 404 if something went wrong
 *         status 200 with posts
 */
router.get('/post/byTag/:tag', (req, res) => {
    Post.find({tag: req.params.tag}, (err, posts) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(posts);
        }
    });
});

/**
 * Get all post interacted by a user
 *
 * @param userId to find interated posts
 * @return status 404 if something went wrong
 *         status 200 with posts
 */
router.get('/post/InteratedByUser/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(user.postsInteracted);
        }
    });
});


/**
 * Get team size by a post Id
 *
 * @param postId to find its team size
 * @return status 404 if something went wrong
 *         status 200 with team size
 */
router.get('/post/getTeamSize/:postId', (req, res) => {
    Post.findById(req.params.postId, (err, post) => {
        if (err) {
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(post.teamSize);
        }
    });
});

module.exports = router;

