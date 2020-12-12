const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const tagRoutes = require("./routes/tag");
const teamRoutes = require("./routes/team");
const commentRoutes = require("./routes/comment");
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));

const uri = "mongodb+srv://new_user:55001234@cluster0.tpbel.mongodb.net/WeGroup?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use('/tags', tagRoutes);
app.use('/teams', teamRoutes);
app.use('/post/:id/comment', commentRoutes);
app.use('/', postRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log("WeGroup server starts listening at port " + port);
});
