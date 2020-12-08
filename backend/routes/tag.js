const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");

/**
 * Add a new tag to database
 *
 * @param department
 * @param courseNumber
 * @param semester
 * @param year
 * @return status 400 if input is invalid
 *         status 201 with new tag object
 */
router.post('/create', (req, res) => {
    const tag = new Tag({
        department: req.body.department,
        courseNumber: req.body.courseNumber,
        semester: req.body.semester,
        year: req.body.year
    });
    tag.save((err, tag) => {
        if (err) {
            res.status(400).send("invalid input");
        } else {
            res.status(201).send(tag);
        }
    });
});

/**
 * Get all tags
 *
 * @return status 404 if something went wrong
 *         status 200 with tag objects
 */
router.get('/', (req, res) => {
    Tag.find({}, (err, tags) => {
        if (err) {
            res.status(404).send("Something went wrong");
        } else {
            res.status(200).send(tags);
        }
    });
});

/**
 * Get a tag with given keys
 *
 * @param department
 * @param courseNumber
 * @param semester
 * @param year
 * @return status 404 if fail to get
 *         status 200 if successfully get
 */
router.get('/search', (req, res) => {
    Tag.find({
        department: req.body.department,
        courseNumber: req.body.courseNumber,
        semester: req.body.semester,
        year: req.body.year
    }, (err, tag) => {
        if (err) {
            res.status(404).send("Get failure");
        } else {
            res.status(200).send(tag);
        }
    });
});

module.exports = router;