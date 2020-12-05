const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    // TO-DO: add team schema properties
});

module.exports = mongoose.model("Team", TeamSchema);