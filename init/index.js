const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL =('mongodb://127.0.0.1:27017/wanderlust');
main()
.then(() =>{
    console.log("connecte to db")
})
.catch(err=>
    console.error(err)
    );
async function main(){
    await mongoose.connect(MONGO_URL);
};


const initDB = async () =>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: '662a0e5511ecd5bc56fc23b7'
    }))
    await Listing.insertMany(initdata.data);
    console.log("data was initialise")
};

initDB();