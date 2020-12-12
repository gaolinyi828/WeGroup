const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");


/**
 * Get all comments of the post
 *
 * @param post id
 * @return status 404 if something went wrong
 *         status 200 with comment objects
 */
router.get('/post/:postId/comment/', (req, res) => {
    Comment.find({postId: req.params.postId}, (err, comments) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(comments);
        }
    });
});

/**
 * Add a new comment to database
 *
 * @param user id
 * @param post id
 * @param comment text
 * @return status 400 if input is invalid
 *         status 201 with new comment object
 */
router.post('/post/:postId/comment/create', (req, res) => {
    const comment = new Comment({
        user: req.body.userId,
        postId: req.body.postId,
        text: req.body.text,
    });
    comment.save((err, comment) => {
        if (err) {
            res.status(400).send("invalid input");
        } else {
            res.status(201).send(comment);
        }
    });
    Post.findById(req.body.postId, (err, post) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            post.comments.push(comment);
            post.save();
            User.findById(req.body.userId, (err, user) => {
                if (err) {
                    res.status(404).send("Something went wrong");
                } else {
                    user.postsInteracted.push(post);
                    user.save();
                }
            });
        }
    });
});

/**
 * Edit comment
 *
 * @param id comment id to edit
 * @param comment
 * @return status 404 if something went wrong
 *         status 200 with comment object
 */
router.put('/post/:postId/comment/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {text: req.body.text}, (err, comment) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(comment);
        }
    });
})

/**
 * Delete a comment with given id
 *
 * @param id comment id to delete
 * @return status 404 if fail to delete
 *         status 200 if successfully delete
 */
router.delete('/post/:postId/comment/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            Post.findById(comment.postId, (err, post) => {
                if (err) {
                    res.status(404).send("Something went wrong");
                } else {
                    let i = post.comments.indexOf(comment);
                    post.comments.splice(i, 1);
                    post.save();
                }
            });
        }
    })
    Comment.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(404).send("Delete failure");
        } else {
            res.status(200).send("Successfully delete");
        }
    });
});


module.exports = router;