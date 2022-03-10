const locatorsUserSchema = require("../Model/LocatorUser");
const csv = require("csv-parser");
const fs = require("fs");
const _ = require("lodash");

exports.getAllLocatorUsers = async (req, res, next) => {
  const results = [];
  try {
    fs.createReadStream("./Controler/Locator.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          locatorsUserSchema
            .insertMany(results)
            .then((rs) => console.log("res", rs))
            .catch((err) => console.log("er", err));
        } catch (error) {
          console.log(error);
        }
      });
  } catch (error) {
    console.log("error->", error);
  }
};

exports.getLocators = async (req, res, next) => {
  console.log("hit");
  const { city, country, service , limit } = req.body;
  try {
    const data = await locatorsUserSchema
      .find({
        $or: [
          { LocatorCities: { $regex: city } },
          { LocatorCountries: { $regex: country } },
          { Title: { $regex: service } },
        ],
      }).limit(55);
    return res.status(200).json({
      success: true,
      all: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.getCountryCity = async (req, res, next) => {
  try {
    const data = await locatorsUserSchema
      .find()
      .select(["LocatorCities", "LocatorCountries", "Title"]);
    const finalData = {
      city: [],
      country: [],
      service: [],
    };

    data.forEach((item) => {
      item.LocatorCities && finalData.city.push(item.LocatorCities);
      item.LocatorCountries && finalData.country.push(item.LocatorCountries);
      item.Title && finalData.service.push(item.Title);
    });

    finalData.city = _.uniq(finalData.city);
    finalData.country = _.uniq(finalData.country);
    finalData.service = _.uniq(finalData.service);

    return res.status(200).json({
      count: data.length,
      finalData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
