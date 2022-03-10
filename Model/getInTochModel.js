const mongoose = require('mongoose');


const getInTouchSchema  = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    option : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('getInTouchQueries' , getInTouchSchema )