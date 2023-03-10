const mongoose = require("mongoose");

const Books = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    avail: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    upc: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bookdata = mongoose.model("Bookdata", Books);
module.exports = Bookdata;
