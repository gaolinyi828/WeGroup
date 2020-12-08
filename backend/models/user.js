const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
    postsCreatedByUser: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    postsInteracted: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

module.exports = mongoose.model("User", UserSchema);