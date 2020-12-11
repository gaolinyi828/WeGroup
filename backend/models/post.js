const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    // TO-DO: add post schema properties
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    },
    teamSize: {
        type: Number,
        Default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    interested: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

    // not sure if we need title, description, image, etc.
    text: String,
    img: String,
    title: String,
    hasFormedGroup: Boolean
});

module.exports = mongoose.model("Post", PostSchema);