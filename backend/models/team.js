const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    // TO-DO: add team schema properties
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    teamName: String,
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

module.exports = mongoose.model("Team", TeamSchema);