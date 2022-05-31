const express = require("express");
const routers = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

const {
  getAllLocatorUsers,
  getLocators,
  getCountryCity,
} = require("../Controler/LoacatorUser");
const { getInTouchQuerySubmittion } = require("../Controler/getInTouchQuery");
const { subcriptionQuerySubmittion } = require("../Controler/Subcription");
const productSchema = require("../Model/addProduct");
const {getAllProducts} = require('../Controler/products')

// routers.post('/userData' ,  getAllLocatorUsers)

routers.post("/usersData", getLocators);
routers.post("/getInTouchQuery", getInTouchQuerySubmittion);
routers.get("/getAddresses", getCountryCity);
routers.post("/subcription", subcriptionQuerySubmittion);
routers.get("/getAllProducts" , getAllProducts);



routers.post("/addProduct", upload.single("productImage"), (req, res) => {
  try {
    const product = new productSchema({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      productImage: req.file.filename,
      productType : req.body.productType
    });

    const savedProduct = product.save();

    return res.status(200).json({
      product : savedProduct,
      success: true,
      message: "your request has been submitted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

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
