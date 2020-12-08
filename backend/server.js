const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/post', require('./routes/post'));

const uri = "mongodb+srv://new_user:55001234@cluster0.tpbel.mongodb.net/WeGroup?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
    console.log("WeGroup server starts listening at port " + port);
});
