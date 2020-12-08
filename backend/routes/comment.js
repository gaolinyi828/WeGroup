const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");


/**
 * Get all comments of the post
 *
 * @param post id
 * @return status 404 if something went wrong
 *         status 200 with post objects
 */
router.get("/", function (req, res) {
    Post.findById(req.params.id).populate({
        path: "comments",
        options: {sort: {createdAt: -1}} // sorting the populated comments array to show the latest first
    }).exec(function (err, post) {
        if (err || !post) {
            res.status(404).send("Something went wrong");
        }
        res.status(200).send(post);
    });
});

/**
 * Add a new comment to database
 *
 * @param user
 * @param post id
 * @return status 400 if input is invalid
 *         status 201 with new comment object
 */
router.post('/create', (req, res) => {
    const comment = new Comment({
        author: {id: req.user._id, username: req.user.username},
        postId: req.params.id
    });
    comment.save((err, comment) => {
        if (err) {
            res.status(400).send("invalid input");
        } else {
            res.status(201).send(comment);
        }
    });
});

/**
 * Edit comment
 *
 * @param commentId
 * @param comment
 * @return status 404 if something went wrong
 *         status 200 with comment object
 */
router.put('/commentId', (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, comment) => {
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
router.delete('/delete/:id', (req, res)=> {
    Comment.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(404).send("Delete failure");
        } else {
            res.status(200).send("Successfully delete");
        }
    });
});


module.exports = router;