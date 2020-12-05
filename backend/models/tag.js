const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    // TO-DO: add tag schema properties
});

module.exports = mongoose.model("Tag", TagSchema);