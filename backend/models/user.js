const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // TO-DO: add user schema properties
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    avatar: String,
    postsCreatedByUser: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    postsInteracted: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

module.exports = mongoose.model("User", UserSchema);