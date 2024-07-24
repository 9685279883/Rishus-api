const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);

const DB = mongoose.connect(MONGO_URL).then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Database Connection Error");
})




