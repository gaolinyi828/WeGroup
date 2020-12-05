const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    // TO-DO: add comment schema properties
    commentId: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // comment content needed?
    text: String
});

module.exports = mongoose.model("User", CommentSchema);