const fs = require("fs");
const axios = require("axios");
const bookData = async (str) => {
  try {
    const response = await axios.get(
      `http://books.toscrape.com/catalogue/category/books_1/page-${str}.html`
    );
    const htmlData = await response?.data;

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"

    if (!fs.existsSync(`./downloads/${currentDate}`)) {
      fs.mkdirSync(`./downloads/${currentDate}`, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully!");
      });
    }

    fs.writeFile(
      `./downloads/${currentDate}/page-${str}.txt`,
      htmlData,
      () => {}
    );
    console.log(`page ${str} downloaded`);
  } catch (error) {
    console.error(error);
  }
};

const fillData = (val) => {
  // bookData(str++);
  if (val) {
    for (let i = 1; i <= 50; i++) {
      bookData(i);
    }
  }
};

module.exports = fillData;
