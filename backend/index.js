    
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./router/user.js");
const productRoute = require("./router/products.js");
const potdRoute = require("./router/potd.js");
const feedRoute = require("./router/feed.js");
const cors = require("cors");

require("dotenv").config();

app.use(express.json());

app.use(cors({
  origin: "https://kheti.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use("/users",userRoute);

app.use("/products",productRoute);

app.use("/potd",potdRoute);


app.use("/feed",feedRoute);

app.get("/" , (req,res)=>{
  res.json({msg:"we are in v3 testing of the site nest"})
}) 



app.listen(process.env.port);