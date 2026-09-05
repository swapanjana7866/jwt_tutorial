
const mongoose = require("mongoose")

 function connectDB() {
   mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected db");
    })



    }

 

module.exports = connectDB
