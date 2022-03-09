const locatorsUserSchema = require("../Modal/LocatorUser");
const csv = require("csv-parser");
const fs = require("fs");

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
  console.log('hit')
  const {city , country , service } = req.body
  try {
    const data = await locatorsUserSchema
      .find({
        $and: [
          { LocatorCities: { $regex: city } },
          { LocatorCountries: { $regex: country } },
          { Title: { $regex: service } },
        ],
      })
    res.send(data);
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
};
