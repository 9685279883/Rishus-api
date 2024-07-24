// const {default : mongoose} = require("mongoose");

// const { collection } = require("./employeeModel");

const mongoose = require("mongoose");

const hrData = mongoose.Schema({

    firstname : {
        type : String,
        require : true
    },
    lastname : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
},{ collection : "hrData"}

)

module.exports = mongoose.model("hrData", hrData)




