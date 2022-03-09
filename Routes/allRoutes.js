const express = require('express');
const routers = express.Router();
const {getAllLocatorUsers , getLocators} = require('../Controler/LoacatorUser') 


routers.post('/userData' ,  getAllLocatorUsers)

routers.get("/usersData", getLocators )


module.exports = routers