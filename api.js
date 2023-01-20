const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const Booksdata = require("./model");

app.use(cors());
app.use(express.json());
const rotues = ()=>{
app.get("/title", async (req, res) => {
    const data = await Booksdata.find({}, { title: 1, _id: 1 });
    res.json({ data });
  });
  app.get("/ratings", async (req, res) => {
    const data = await Booksdata.find({}, { title: 1, ratings: 1, _id: 1 });
    res.json({ data });
  });
  app.get("/link", async (req, res) => {
    const data = await Booksdata.find({}, { link: 1, _id: 1 });
    res.json({ data });
  });

  
  
  app.post("/search", async (req, res) => {
    console.log(req.body);
    const { data } = req.body;
    const dd = await Booksdata.find({ title: data });
    const dt = await Booksdata.find({ link: data });
    // console.log(dd);
    if (dd && dd.length > 0) {
      res.json({  ans:dd, msg: "This Title exist", success: true });
    } else if (dt && dt.length > 0) {
      res.json({  ans:dt, msg: "This Url exist", success: true });
    } else {
      res.json({ msg: "This Url / Title doesn't exist", success: false });
    }
  });
  
  app.listen(3002, () => {
    console.log("Api Function Alive");
  });
  
}

module.exports = rotues;