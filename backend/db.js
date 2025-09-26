const mongoose = require("mongoose");
require("dotenv").config();
let dbUrl = process.env.DB_CONNECTION;
mongoose.connect(dbUrl)
.then(()=>console.log("connected"))
.catch((err)=>console.log("error" + err));



const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dxpw7h9yk/image/upload/v1752827671/user_tksivi.png"},
    name:{
        type:String,
        default: "User"},
    points:{
        type:Number,
        default: 0},
    latitude:{
        type:Number,
        default:28.7041},
    longitude:{
        type:Number,
        default:28.7041},
    city:{
        type:String,
        default:"Delhi"},
    contact:{
        type:String,
        default: "User ki koi info availablr nahi hai"}
    })

const User = mongoose.model("User",userSchema);






const productSchema = new mongoose.Schema({
  image : String,
  type : String,
  title : String,
  contact : String,
  details : String,
  price : String,
  quality : String,
  policy : String,
  ownerAvatar: String,
  ownerName: String,
  clicks : { type:Number, default: 0},
  createdOn: {type:Date , default: Date.now , index: {expires: "2d"}},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Products = mongoose.model("Products",productSchema)



const feedSchema = new mongoose.Schema({
  image : String,
  details : String,
  createdOn: {type:Date , default: Date.now , index: {expires: "2d"}},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Feed = mongoose.model("Feed",feedSchema)




const potdSchema = new mongoose.Schema({
  image : String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Potd = mongoose.model("Potd",potdSchema)






module.exports = {
    User,
    Products,
Potd,
Feed,}


