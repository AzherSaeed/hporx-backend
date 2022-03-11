const express = require('express');
const routers = express.Router();
const {getAllLocatorUsers , getLocators , getCountryCity} = require('../Controler/LoacatorUser') 
const {getInTouchQuerySubmittion} = require('../Controler/getInTouchQuery')
const {subcriptionQuerySubmittion} = require('../Controler/Subcription')


// routers.post('/userData' ,  getAllLocatorUsers)





routers.post("/usersData", getLocators )
routers.post('/getInTouchQuery' ,  getInTouchQuerySubmittion)
routers.get("/getAddresses", getCountryCity)
routers.post('/subcription' , subcriptionQuerySubmittion )


module.exports = routers;



// const getShipmentFetchEstimate = async (obj) => {
//     const promise = [];
//     obj.forEach(item => {
//       promise.push(
//         getestimate(addrsz)
//       )
//     });
//     const res = await Promise.all(promise);
//     return res;
//   }