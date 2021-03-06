const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Tag = require("../models/tag");
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Item picture only allows .png, .jpg and .jpeg format'));
        }
    }
});

/**
*   CREATE - add a new post to DB
 *
*   @return status 400 if invalid input
 *         status 201 with a new item added
*/
router.post('/post', upload.single('img'), (req, res) => {
    const url = req.protocol + '://' + req.get('host');

    // get data from request
    const userId = req.body.userId;
    const tagId = req.body.tagId;
    const teamSize = req.body.teamSize;
    const createdAt = new Date();
    const comments = req.body.comments;
    const interested = req.body.interested;
    const text = req.body.text;
    const title = req.body.title;
    const hasFormedGroup = false;
    const newPost = new Post({
        userId: userId,
        tagId:tagId,
        teamSize: teamSize,
        createdAt: createdAt,
        comments: comments,
        interested:interested,
        text: text,
        img: req.file ? url + '/public/' + req.file.filename : null,
        title: title,
        hasFormedGroup: hasFormedGroup
    });

    newPost.save(async(err, newPost) => {
        if (err) {
            console.log(err);
            res.status(400).send("invalid input");
        } else {
            try {
                let newUser = await User.findOneAndUpdate({_id: userId},
                    {"$push": {"postsCreatedByUser": newPost._id}});
                let newTag = await Tag.findOneAndUpdate({_id: tagId}, {"$push": {"posts": newPost._id}});
                await Promise.all([newUser, newTag]);
                res.status(200).send(newPost);
            } catch (err){
                res.status(404).send("Something went wrong");
            }
        }
    });
});

/**
 * Update a post's text
 *
 * @param postId  post to update
 * @return status 404 if something went wrong
 *         status 200 with item objects
 */

router.put('/post/updateText/:postId',  (req, res) => {
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
 * Add to a post's interested list
 *
 * @param postId  post to update
 * @param user_id user to add into the interest list
 * @return status 404 if something went wrong
 *         status 200 with item objects
 */

router.put('/post/addInterested/:postId/:userId',  (req, res) => {
    var postId = req.params.postId;
    var userId = req.params.userId;

    Post.findOneAndUpdate({_id: postId},
        {"$push": {"interested": userId}}, (err, post) => {
            if (err) {
                res.status(404).send("Something went wrong");
            } else {
                res.status(200).send(post);
            }
        });
});

/**
 * Delete the specific user in post's interested list
 *
 * @param postId  post to update
 * @param user_id user to delete from the interest list
 * @return status 404 if something went wrong
 *         status 200 with item objects
 */

router.put('/post/deleteInterested/:postId/:userId',  (req, res) => {
    var postId = req.params.postId;
    var userId = req.params.userId;

    Post.findOneAndUpdate({_id: postId},
        {"$pull": {"interested": userId}}, (err, post) => {
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
router.delete('/post/delete/:postId', async(req, res)=> {
    Post.findByIdAndDelete(req.params.postId, async(err, post) => {
        if (err) {
            res.status(404).send("Delete failure");
        } else {
            try {
                let newUser = await User.findOneAndUpdate({_id: post.userId},
                    {"$pull": {"postsCreatedByUser": post._id}});
                let newTag = await Tag.findOneAndUpdate({_id: post.tagId}, {"$pull": {"posts": post._id}});
                await Promise.all([newUser, newTag]);
                res.status(200).send("Successfully delete");
            } catch (err){
                res.status(404).send("Something went wrong");
            }
        }
    });
});

/**
 * Get post by a PostId
 *
 * @param post id to find
 * @return status 404 if something went wrong
 *         status 200 with post
 */
router.get('/post/:postId', (req, res) => {
    Post.findById(req.params.postId, (err, post) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(post);
        }
    });
});

/**
 * Get a list of posts with given ids
 *
 * @param id post ids
 * @return status 404 if fail to get
 *         status 200 if successfully get
 */
router.post('/post/ids', (req, res)=> {
    let ids = [...new Set(req.body)];
    Post.find({'_id': { $in: ids}}, (err, items) => {
        if (err) {
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(items);
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
    Post.find({tagId: req.params.tag}, (err, posts) => {
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

