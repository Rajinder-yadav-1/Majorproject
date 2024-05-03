// const mongoose = require("mongoose");
// const initdata = require("./data.js");
// const Listing = require("../models/listing.js");


// const MONGO_URL =('mongodb://127.0.0.1:27017/wanderlust');
// main()
// .then(() =>{
//     console.log("connecte to db")
// })
// .catch(err=>
//     console.error(err)
//     );
// async function main(){
//     await mongoose.connect(MONGO_URL);
// };


// const initDB = async () =>{
//     await Listing.deleteMany({});
//     initdata.data = initdata.data.map((obj) => ({
//         ...obj,
//         owner: '662a0e5511ecd5bc56fc23b7'
//     }))
//     await Listing.insertMany(initdata.data);
//     console.log("data was initialise")
// };

// initDB();



const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require('dotenv').config()

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


const axios = require('axios');

const mapboxAccessToken = "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ";

async function geocodeLocation(location) {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`, {
            params: {
                access_token: mapboxAccessToken
            }
        });
        const result = response.data.features[0];
        const coordinates = result.geometry.coordinates;
        return { type: "Point", coordinates };
    } catch (error) {
        console.error('Error geocoding location:', location, error);
        return null;
    }
}

async function addGeometryToEachListing(initData) {
    try {
        const updatedListings = [];
        for (const listing of initData) {
            const geometry = await geocodeLocation(listing.location);
            const updatedListing = { ...listing, geometry };
            updatedListings.push(updatedListing);
        }
        return updatedListings;
    } catch (error) {
        console.error('Error adding geometry to listings:', error);
    }
}

const allListings = addGeometryToEachListing(initData.data)
    .then(updatedListings => initDB(updatedListings))
    .catch(error => console.error('Error:', error));




    const initDB = async (allListings) => {
    await Listing.deleteMany({});
    console.log(allListings)
    allListings = allListings.map((obj) => ({ ...obj ,  owner: "662a0e5511ecd5bc56fc23b7"}));
    await Listing.insertMany(allListings);
    console.log("Data was initializing");
};


