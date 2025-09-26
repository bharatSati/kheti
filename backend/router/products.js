
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { z } = require("zod");
const router = express.Router();
router.use(express.json());
const Products = require("../db").Products;
const User = require("../db").User
const authMiddleware = require("../middleware")
const cloudinary = require("../cloudinary.js")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

let postSchema = z.object({
    image: z.object({originalname: z.string().regex(/\.(png|jpg|jpeg|gif|webp)$/i,"Only Image Accepted")}).passthrough(),
    type: z.string(),
    title: z.string(),
    contact: z.string(),
    details: z.string(),
    price: z.string(),
    quality: z.string(),
    policy: z.string(),
    owner: z.string(),
})



router.get("/info",authMiddleware,async(req,res)=>{
    let { productId } = req.query;
    try{
        let productData = await Products.findById(productId);
        res.status(200).json(productData);}
    catch(err){res.status(400).json({message: "Product not found"});}
    
})


router.get("/productsInfo",authMiddleware,async(req,res)=>{
    let {userId} = req.query;
    try{
        let products = await Products.find({owner : userId})
        res.status(200).json(products);}
    catch(err){ res.status(400).json({message: " Can't get product info right now !!"}) }
})


router.get("/count",authMiddleware,async(req,res)=>{
    try{
        let count = await Products.countDocuments({owner: req.user});
        if(count>=2) return res.status(200).json({bool: true , message: "You already have 2 live post"});
        return res.status(200).json({bool: false , message: "Successful"});}

    catch(err){res.status(400).json({message: "Unsuccessful"})}
})


router.post("/add",authMiddleware,upload.single("image"),async(req,res)=>{
    console.log("bharat");
    const inputData = {
        image: req.file,
        owner: req.user,
        ...req.body,}
    let response = postSchema.safeParse(inputData);
    if(!response.success) return res.status(400).json({message: "Invalid Input"});
    let url;
    try{
        let productImage = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream({folder:"products"},(err,result)=>{
                if(err) reject(err);
                else resolve(result);})
            stream.end(req.file.buffer);})
        url = productImage.secure_url;}
    catch(err){
        return res.status(400).json({message: "Unsuccessful"})}
    
    let dbUser = await User.findById(req.user);
    let productData = {image: url , owner: req.user, ownerAvatar:dbUser.avatar, ownerName: dbUser.name , ...req.body}
    let newProduct = await Products.create(productData);
    return res.status(200).json({message:"Product added successfully", productId: newProduct._id})

})




router.get("/filter",authMiddleware,async (req,res)=>{
    const { q } = req.query;

try {
    let allProduct = await Products.find().sort({clicks:-1,createdOn : -1});
    if(!q||!(q.trim())) return res.status(200).json(allProduct);
    const search = q.trim().split(/\s+/);
    const minReq = Math.max(1,Math.floor(search.length/3));
    let filteredUser = [];
    for(let i = 0;i<allProduct.length;i++){
        let count = 0;
        for(let j = 0;j<search.length;j++){
            let toSearch = search[j].toLowerCase();
            if(allProduct[i].title.toLowerCase().includes(toSearch)) count++;}
        if(count>=minReq) filteredUser.push({...allProduct[i]._doc,count: count});}
    
    filteredUser.sort((a,b)=>{
        if(b.count!==a.count) return b.count - a.count;
        if(b.clicks!==a.clicks) return b.clicks - a.clicks;
        return  new Date(a.createdOn) - new Date(b.createdOn);})
        
    res.status(200).json(filteredUser);}
    
    catch(err){res.status(400).json({message:"Unsuccessful"})}
        })




router.delete("/delete",authMiddleware,async(req,res)=>{
    let productID = req.body.productId;
    try{
        let productDelete = await Products.findByIdAndDelete(productID);
        res.status(200).json({message:"Post deleted successfully"});}
    catch(err){res.status(400).json({message:"Unsuccessful"})}
})


router.put("/clicks",authMiddleware,async (req,res)=>{
    let productId = req.body.productId;
    let clicks = req.body.clicks;
    let newClicks = Number(clicks) + 1;
    try{
        let productDb = await Products.findByIdAndUpdate(productId,{clicks: newClicks},{new:true})
        
        res.status(200).json(productDb);}
    catch(err){res.status(400).json({bool: false})}
})


module.exports = router;