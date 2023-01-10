const cheerio = require("cheerio");
const Booksdata = require("./model");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then((result) => {
    console.log("success");
  })
  .catch((err) => {
    console.log("err");
  });

const htmlData = await response?.data;
const $ = cheerio.load(response.data);

const type = $("h1").text();
const books = $("article");

const dataMongo = () => {
  books.each(async function () {
    title = $(this).find("h3 a").text();
    price = $(this).find(".price_color").text();
    stock = $(this).find(".availability").text().trim();

    ratings = $(this).find(".star-rating").attr("class").split(" ")[1];
    link = $(this).find("h3 a").attr("href");

    // const newData = await Booksdata.create({
    //   title,
    //   price,
    //   stock,
    //   ratings,
    //   link,
    // });
    // await newData.save();
  });
};

export default dataMongo;
