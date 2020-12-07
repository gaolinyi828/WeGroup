const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    // TO-DO: add user schema properties
    userName: String,
    userPassword: String,
    avatar: String,
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
    postsCreatedByUser: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    postsInteracted: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);