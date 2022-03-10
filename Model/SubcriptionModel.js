const mongoose = require('mongoose');


const subcriptionSchema  = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
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
    inviteFriend : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    service: {
        type : String,
        required : true
    },
    position : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('subcriptionQueries' , subcriptionSchema )