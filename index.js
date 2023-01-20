const fillData = require("./books");
const rotues = require("./api");
const fs = require("fs");
const mongoData = require("./dataMongo");

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

if (!fs.existsSync(`./downloads/${currentDate}`)) {
  fillData(true);
} else {
  console.log(`Folder with name ${currentDate} already exists!`);
  mongoData(true);
}

rotues();
