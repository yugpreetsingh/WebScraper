const cheerio = require("cheerio");
const Booksdata = require("./model");
var fs = require('fs');
var path = require('path');
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then((result) => {
    console.log("success");
  })
  .catch((err) => {
    console.log("err");
  });
  
  const dataMongo =  (pt) => {
    let filePath = path.join(__dirname, `./downloads/page-${pt}.txt`)
  const $ =cheerio.load(fs.readFileSync(filePath));


  
  const type = $("h1").text();
  const books = $("article");
  books.each(async function () {
   let title = $(this).find("h3 a").text();
   let price = $(this).find(".price_color").text();
   let stock = $(this).find(".availability").text().trim();

   let ratings = $(this).find(".star-rating").attr("class").split(" ")[1];
   let link = $(this).find("h3 a").attr("href");

const ff = await Booksdata.find({title:title,link:link});
if(ff && ff.length>0){
  
  
}else{
  const newData = await Booksdata.create({
    title,
    price,
    stock,
    ratings,
    link,
  });
  await newData.save();
 
}
  });

};
const length = fs.readdirSync( path.join(__dirname, `./downloads`)).length
console.log(length);

const mongoData = (val)=>{
  if(val){
for(let i=1;i<=length;i++){

  dataMongo(i);
}}}

module.exports = mongoData;



