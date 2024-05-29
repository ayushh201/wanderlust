const express = require("express");
const app = express();
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const Listing = require("./models/listing.js");

main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req,res) => {
    res.send("root is working");
});

app.get("/listings", (req,res) => {
    Listing.find({}).then((res) => {
        console.log(res);
    });
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});