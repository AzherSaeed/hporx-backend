const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    productType: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    productImage: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
