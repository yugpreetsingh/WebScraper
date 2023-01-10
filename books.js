const fs = require("fs");
const axios  = require('axios');
const bookData = async (str) => {
  try {
    const response = await axios.get(`http://books.toscrape.com/catalogue/category/books_1/page-${str}.html`);
    const htmlData = await response?.data;
      fs.writeFile(`./downloads/page-${str}.txt`, htmlData, () => {});
      console.log(`page ${str} downloaded`);
  } catch (error) {
    console.error(error);
  }
};

const fillData = (val)=>{

  // bookData(str++);
  if(val){
  for (let i = 1; i <= 50; i++) {
    bookData(i);
  }
}
}

module.exports = fillData;