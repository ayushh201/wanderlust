const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://unsplash.com/photos/body-of-water-and-seashore-JFeOy62yjXk",
        set : (v) => v === ""? "https://unsplash.com/photos/body-of-water-and-seashore-JFeOy62yjXk" : v,
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;