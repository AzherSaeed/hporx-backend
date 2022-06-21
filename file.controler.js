const processFile = require("./middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");

// Instantiate a storage client with credentials
const dStorage = new Storage({ keyFilename: "houseUp-hporx.json" });
const dBucket = dStorage.bucket("hporx-b");

const upload = async (req, res) => {
  console.log(req);



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
          data : savedProduct
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


  


  try {
    await processFile(req, res);
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
        `https://storage.googleapis.com/${dBucket.name}/${dBucket.name}`
      );
      try {
        // Make the file public
        await dBucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        url: publicUrl,
      });
    });
    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
module.exports = { upload };
