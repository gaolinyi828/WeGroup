const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    // TO-DO: add tag schema properties
    tagId: mongoose.Schema.Types.ObjectId,
    department: String,
    courseNumber: Number,
    semester: String,
    year: Number,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

module.exports = mongoose.model("Tag", TagSchema);