const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    // TO-DO: add post schema properties
});

module.exports = mongoose.model("Post", PostSchema);