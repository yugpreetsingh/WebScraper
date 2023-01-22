const fs = require("fs");
const axios = require("axios");
const mongoData = require("./dataMongo");

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

let flag = false;

const bookData = async (str) => {
  try {
    const response = await axios.get(
      `http://books.toscrape.com/catalogue/category/books_1/page-${str}.html`
    );
    const htmlData = await response?.data;

    // console.log(currentDate);

    fs.writeFileSync(
      `./downloads/${currentDate}/page-${str}.txt`,
      htmlData,
      () => {}
    );

    if (!fs.existsSync(`./downloads/${currentDate}/page-${str}.txt`)) {
      flag = true;
    }

    // console.log("LENGTH " + length);

    console.log(`page ${str} downloaded`);
  } catch (error) {
    console.error("The Link was invalid Or Problem in directory");
  }
};

const fillData = async (val) => {
  if (val) {
    fs.mkdir(`./downloads/${currentDate}`, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Directory "${currentDate}" created successfully!`);
    });

    for (let i = 1; i <= 50; i++) {
      // console.log(flag);

      if (flag) {
        console.log(`Error in filling page "${i}"`);
        break;
      }
      await bookData(i);

      let length = 0;
      length = fs.readdirSync(`./downloads/${currentDate}`).length;
      if (length == 50) {
        console.log(`Calling mongoData for filling data of ${length} page`);
        mongoData(true);
      }
    }
  }
};

module.exports = fillData;
