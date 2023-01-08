const express = require("express");

const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

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
console.log("mmmmmm");
app.use(cors());

let str = 1;
// const url = `http://books.toscrape.com/catalogue/category/books_1/page-${str}.html`;

const book_List = [];

const bookData = async (str) => {
  try {
    const response = await axios.get(
      `http://books.toscrape.com/catalogue/category/books_1/page-${str}.html`
    );
    const $ = cheerio.load(response.data);

    const type = $("h1").text();
    const books = $("article");

    books.each(async function () {
      title = $(this).find("h3 a").text();
      price = $(this).find(".price_color").text();
      stock = $(this).find(".availability").text().trim();

      ratings = $(this).find(".star-rating").attr("class").split(" ")[1];
      link = $(this).find("h3 a").attr("href");

      const newData = await Booksdata.create({
        title,
        price,
        stock,
        ratings,
        link,
      });
      await newData.save();

      book_List.push({ title, price, stock, ratings, link });
    });

    console.log(type);
    console.log(book_List);
  } catch (error) {
    console.error(error);
  }
};

for (let i = str; i <= 50; i++) {
  bookData(str++);
}

app.get("/title", async (req, res) => {
  const data = await Booksdata.find({}, { title: 1, _id: 0 });
  res.json({ data });
});
app.get("/ratings", async (req, res) => {
  const data = await Booksdata.find({}, { title: 1, ratings: 1, _id: 0 });
  res.json({ data });
});
app.get("/link", async (req, res) => {
  const data = await Booksdata.find({}, { link: 1, _id: 0 });
  res.json({ data });
});

app.listen(3002, () => {
  console.log("running");
});
