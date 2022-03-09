const mongoose = require('mongoose');


const locatorsUserSchema = mongoose.Schema({
    id : {
        type : String,
        required : false
    },
    Title : {
        type : String,
        required : false
    },
    PostType : {
        type : String,
        required : false
    },
    LocatorType : {
        type : String,
        required : false
    },
    _telephone  :{
        type : String,
        required : false
    },
    _address : {
        type : String,
        required : false
    },
    LocatorCities : {
        type : String,
        required : false
    },
    _zip : {
        type : String,
        required : false
    },
    LocatorCountries : {
        type : String,
        required : false
    },
    _email : {
        type : String,
        required : false
    }
})


module.exports = mongoose.model('locatorUsers' , locatorsUserSchema )