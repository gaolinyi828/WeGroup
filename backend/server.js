// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use('/', require('./routes/post'));

// const uri = "mongodb+srv://new_user:55001234@cluster0.tpbel.mongodb.net/WeGroup?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// app.listen(port, () => {
//     console.log("WeGroup server starts listening at port " + port);
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const indexRoutes = require("./routes/index");
const tagRoutes = require("./routes/tag");
const teamRoutes = require("./routes/team");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");

app.use(express.json());

const uri = "mongodb+srv://new_user:55001234@cluster0.tpbel.mongodb.net/WeGroup?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', indexRoutes);
app.use('/tags', tagRoutes);
app.use('/teams', teamRoutes);
app.use('/users', userRoutes);
app.use('/post/:id/comment', commentRoutes);
app.use('/', require('./routes/post'));
app.use('/', require('./routes/user'));

app.listen(port, () => {
    console.log("WeGroup server starts listening at port " + port);
});
