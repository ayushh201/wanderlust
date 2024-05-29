const express = require("express");
const app = express();
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const Listing = require("./models/listing.js");
const path = require("path");


main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));


app.get("/", (req,res) => {
    res.send("root is working");
});

app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

app.get("/listings/new", async (req,res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//create route
app.post("/listings", async (req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});