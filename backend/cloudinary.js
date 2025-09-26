const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();


console.log("Cloud Name:", process.env.cloud_name);
console.log("API Key:", process.env.api_key);
console.log("API Secret:", process.env.api_secret);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

module.exports = cloudinary;
