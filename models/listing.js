// const mongoose= require('mongoose');
// const Schema = mongoose.Schema;

// const listingSchema = new Schema ({
//     title :{
//        type :  String,
//       required : true,
//     },
//     description :{
//         type:String,

//     },
//     image: {
//         type: String,
//         default :
//          "https://images.unsplash.com/photo-1638474723137-be610f3ab4cf?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set: (v) => {
//             v === "" ? "https://images.unsplash.com/photo-1638474723137-be610f3ab4cf?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             : v
//         }
//     },
//     price : Number,
//     location : String,
//     country : String,

// });


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
