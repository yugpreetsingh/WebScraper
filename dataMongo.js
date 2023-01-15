const cheerio = require("cheerio");
const Booksdata = require("./model");
const axios  = require('axios');
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
  let t = 1;
  
  books.each(async function () {
   
   let title = $(this).find("h3 a").text();
   let price = $(this).find(".price_color").text();
   let ratings = $(this).find(".star-rating").attr("class").split(" ")[1];
   let link = $(this).find("h3 a").attr("href");
  //  console.log(link.substring(5));
 
  
   
   
   
   
   
   const response = await axios.get(`http://books.toscrape.com/catalogue${link.substring(5)}`);
  //  console.log(`http://books.toscrape.com/catalogue${link.substring(5)}`);
   const htmlData = await response?.data;
    let np = cheerio.load(htmlData);
    let article = np("article");

    let dis = article.find("article>p").text();
      let upc = article.find(" table > tbody > tr:nth-child(1)>td").text();
      let stk = article.find(" table > tbody > tr:nth-child(6)>td").text();
      let review = article.find(" table > tbody > tr:nth-child(7)>td").text();
      let tax = article.find(" table > tbody > tr:nth-child(5)>td").text();
      let stock = stk.substring(10,stk.length-1);
  

const ff = await Booksdata.find({title:title,link:link});
if(ff && ff.length>0){
  
  
}else{
  const newData = await Booksdata.create({
    title,
    price,
    stock,
    ratings,
    link,
    upc,
    review,
    tax,
    desc:dis
  });
  await newData.save();
 
}
  });

};
const length = fs.readdirSync( path.join(__dirname, `./downloads`)).length
console.log(length);

const mongoData = (val)=>{
  if(val){
for(let i=1;i<=50;i++){

  dataMongo(i);
}}}



module.exports = mongoData;



