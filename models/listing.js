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


const { ref } = require('joi');
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
        type: String,
        default: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
      },
    price: Number,
    location: String,
    country: String,

    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref: 'Review' ,
        },
      
    ],

    
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
