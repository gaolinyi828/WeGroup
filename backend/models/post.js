const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    // TO-DO: add post schema properties
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    },
    teamSize: {
        type: Number,
        Default: 1
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    interested: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

    // not sure if we need title, description, image, etc.
});

module.exports = mongoose.model("Post", PostSchema);