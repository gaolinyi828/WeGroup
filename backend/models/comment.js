const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    // TO-DO: add comment schema properties
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // comment content needed?
    text: String
});

module.exports = mongoose.model("Comment", CommentSchema);