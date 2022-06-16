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
        console.log(results);
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
  const { city, country, service, limit } = req.body;

  // User.find({city:"abc", country:"abc",name:"ab"})

  // if (city) {
  //   finalData.push({ LocatorCities: { $regex: city } });
  // }
  // if (country) {
  //   finalData.push({ LocatorCountries: { $regex: country } });
  // }
  // if (service) {
  //   finalData.push({ LocatorType: { $regex: service } });
  // }

  // console.log(finalData , 'finalData')

  try {
    // const data = await locatorsUserSchema
    //   .find({LocatorCities : city , LocatorCountries : country ,  LocatorType : service})
    //   .limit(limit);

    const apiResponse = await locatorsUserSchema.find({}).limit(limit);


    const data = [];


    if(!city && !country && !service){
      const imagesUser = apiResponse.filter((user) => user.ImageURL)
      const withImagesUser = apiResponse.filter((user) => user.ImageURL == '')
      data.unshift(...imagesUser);
      data.push(...withImagesUser);
    }

    if (city) {
      // const getCityData = apiResponse.filter(
      //   (data) => data.LocatorCities == city
      // );
      // data.push(...getCityData);
      const imagesUser = apiResponse.filter((user) => user.LocatorCities == city && user.ImageURL)
      const withoutImagesUsers = apiResponse.filter((user) => user.LocatorCities == city && user.ImageURL == '')
      data.unshift(...imagesUser);
      data.push(...withoutImagesUsers)
    }
    if (country) {
      // const getCountriesData = apiResponse.filter(
      //   (data) => data.LocatorCountries == country
      // );
      // data.push(...getCountriesData);
      const imagesUser = apiResponse.filter((user) => user.LocatorCountries == country && user.ImageURL)
      const withoutImagesUsers = apiResponse.filter((user) => user.LocatorCountries == country && user.ImageURL == '')
      data.unshift(...imagesUser);
      data.push(...withoutImagesUsers)
    }
    if (service) {
      // const getServiesData = apiResponse.filter(
      //   (data) => data.LocatorType == service
      // );
      // data.push(...getServiesData);
      const imagesUser = apiResponse.filter((user) => user.LocatorType == service && user.ImageURL)
      const withoutImagesUsers = apiResponse.filter((user) => user.LocatorType == service && user.ImageURL == '')
      data.unshift(...imagesUser);
      data.push(...withoutImagesUsers)
    }

    // const data = await locatorsUserSchema.find({})

    // if(city == '' || country == '' || service == ''){
    //   console.log('nothing selected')
    // }
    // else if(city !== '' || country == '' || service == ''  ){

    // }
    // else if(city == '' || country !== '' || service == '' ){

    // }
    // else if(city == '' || country == '' || service !== '' ){

    // }

    // const getCities = data.filter((item) => item.LocatorCities == city)
    // const getServiece = data.filter((item) => item.LocatorType == service)
    // const getCountry = data.filter((item) => item.LocatorCountries == country)

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
      .select(["LocatorCities", "LocatorCountries", "LocatorType"]);
    const finalData = {
      city: [],
      country: [],
      service: [],
    };

    data.forEach((item) => {
      item.LocatorCities && finalData.city.push(item.LocatorCities);
      item.LocatorCountries && finalData.country.push(item.LocatorCountries);
      item.LocatorType && finalData.service.push(item.LocatorType);
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
