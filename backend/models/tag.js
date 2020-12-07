const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    // TO-DO: add tag schema properties
    department: String,
    courseNumber: Number,
    semester: {
      type: String,
      enum: ['Fall', 'Spring', 'Summer']
    },
    year: Number,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

module.exports = mongoose.model("Tag", TagSchema);