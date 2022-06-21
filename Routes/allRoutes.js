const express = require("express");
const routers = express.Router();
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { format } = require("util");

// let projectId = process.env.GCS_PROJECT
// let keyFileName = 'personalKeys.json'

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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const googleStorage = new Storage({
  projectId: "houseup-294722",
  credentials: {
    client_email: " hporx-480@houseup-294722.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5o8ua+ffyAgi/\nWUpzcLeqqKrPPCajDRi/ZYiRXbVQQd6pA2ktght/3+cR5/IXVbDhUTpaC/H2gsXm\nzGvE6NgxzprwdgJH017cKti/xpevHl5pdQpZu2SAB9//B3p2rQOb0S49Rm+uPTzN\nrGanAyamI7P0EtTXyueeLIZN2c21FDU5MGX+yzKWAArtPfjlr/hCsf9pJ/S4c9sP\nB0EEllt5MguKPPbMW83xct4QH0dpqx5u8Pq3m6/fo+6WlGHxSXR0R6ZGzI1sCJJm\n9pDuVGH7pZBJXem3htHI7L95OIxBnMvIYNg25nomNRk66dAq3DdChVXYRqRTWYVG\nE6ZHnkFDAgMBAAECggEAJ/MTVGkZzidY6ZDWIEywAdZlV86ag/lEC6BWiO3xIHHk\ncFvPDR+UOmsdR3GyXAoxU/POimVKr2GKJDZ2tLvlFqbfGgNTT1Cx99Byr6aVqvZu\nm+Q3k4LryE+piTD7TkHCZoxYFpCrZQRBqwNAXg2kChnh1pMc4cmFGbl8N5G5Ho/5\nSbtQYXyvz7vXIyT9DwCuFBuj0esP8r8GSQHQZxu4m9HK/RKYcg9tFE4Qar4UGDnk\n6euxUgmLXMiHQL48JNH8CNwxXEMaFa2ARWgok41wX1b4aI8sSYFNf+0hVBrzrbb1\nclkaiCfRGJOiLZS+zP+bJ22OlIk/1cYVEFGGQJZReQKBgQD+O6Zq8ga5Hj2jwo1C\n2LR24yRMo8lQmpCR/owni5raGGhaHdOH5jaeNpkNiVhTzrPHQkPsnOHyDnaMWkOY\napGR/D8U5Jd6l9/j6wzSFBYRhfnzPTC3JS7equsSRsOVyAagZKtSTxn0LdSOH9n9\n8FJYfqJu2Tw4Wc2qoRRZlnMnaQKBgQC67hlpdcp8fdG5qBjMH4UXqaKORGe/GjsV\ncN0XlhO71ZXrWPFcTMkOTLbAOIj8OMaVPzvnODu58eNoE1IRpnsroaRG2F/Zs2l5\ncBkDK8efczRhdKDFZWYUnuqS+RMoQKI6bnjV6/eqOILonlNwEePROTkYPVlR2GKN\noSEfp/bZywKBgQD2Ss9kF+hPem54sUeslMfvzQkjfiDPh427AgDBZsuzsaWWeAKv\nS2VqTLZlmMMLHdqolRe8qBd0KnLKcb++bq9r4BU0pmfhijSKVvHqqy7d9w84h/Uj\n2E/Zw3dME2XzOv7AcAZRDPS1y5h5v32uNx1vQe8WuDlQ1h8ayEYwrEIO0QKBgH1D\ngtnt6jPEaJ8d6wgWcyypK1pkspUYMdGrYS0mD7FGboFYh90PQ4gGlkx3ViyWq1Rm\nHHFUeImhc39RuyRCyLUzS4+B/bE4Dg0ntksuskXCgK5x5i6BRYe5+n1k1ZaawVug\nne7UgpGZ7veM6WLnSh/xVbZNniY/d8Nq33SELOJDAoGAHfTFM/UqMt2fO4zEUvL+\nRrISwGFODZ+WV5YLhWGR6qojiTtrfbGHmc1A5g0jzZ/uoA83E4YfadB9bdNuCzJi\nDyKqtYT1H0u1+/P2zonyV7MpMANyS6ZdsADdU5SpT6FfJO+wPEzGdQ2hL5IKfLNJ\nUivn4P223DBsrHa6PlmXBuQ=\n-----END PRIVATE KEY-----\n",
  },
});

const bucket = googleStorage.bucket("hporx");

const {
  getAllLocatorUsers,
  getLocators,
  getCountryCity,
} = require("../Controler/LoacatorUser");
const { getInTouchQuerySubmittion } = require("../Controler/getInTouchQuery");
const { subcriptionQuerySubmittion } = require("../Controler/Subcription");
const productSchema = require("../Model/addProduct");
const { getAllProducts } = require("../Controler/products");

routers.post("/userData", getAllLocatorUsers);

routers.post("/usersData", getLocators);
routers.post("/getInTouchQuery", getInTouchQuerySubmittion);
routers.get("/getAddresses", getCountryCity);
routers.post("/subcription", subcriptionQuerySubmittion);
routers.get("/getAllProducts", getAllProducts);

const dStorage = new Storage({ keyFilename: "houseUp-hporx.json" });
const dBucket = dStorage.bucket("hporx-b");
let processFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

routers.post(
  "/addProduct",
  processFile.single("productImage"),
  async (req, res) => {
    console.log(req.file);
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      // Create a new blob in the bucket and upload the file data.
      const blob = dBucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
      blobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });
      blobStream.on("finish", async (data) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${dBucket.name}/${blob.name}`
        );
        try {
          // Make the file public
          await dBucket.file(req.file.originalname).makePublic();

          const product = new productSchema({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            productImage: publicUrl,
            productType: req.body.productType,
          });

          const savedProduct = await product.save();

          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            url: publicUrl,
            data: savedProduct,
          });
        } catch {
          return res.status(500).send({
            message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
            url: publicUrl,
          });
        }
      });
      blobStream.end(req.file.buffer);
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  }
);

module.exports = routers;
