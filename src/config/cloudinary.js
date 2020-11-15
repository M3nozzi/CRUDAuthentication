const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require('express');
const multer = require("multer");


const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

let storage = new CloudinaryStorage({
  cloudinary,
  folder: "ProjectMonday", 
  allowedFormats: ["jpg", "png", "jpeg"],
  
  filename: function (req, res, cb) {
    cb(null, res.originalname.split(".")[0]); 
  },
});

const uploadCloud = multer({ storage });
module.exports = uploadCloud;