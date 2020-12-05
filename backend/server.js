const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());

const uri = "change_to_mongodb_url";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
    console.log("WeGroup server starts listening at port " + port);
});
