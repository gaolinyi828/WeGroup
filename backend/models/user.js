const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // TO-DO: add user schema properties
});

module.exports = mongoose.model("User", UserSchema);