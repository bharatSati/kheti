
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { z } = require("zod");
const router = express.Router();
router.use(express.json());
const Potd = require("../db").Potd;
const User = require("../db").User
const authMiddleware = require("../middleware")
const cloudinary = require("../cloudinary.js")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

let potdSchema = z.object({
    image: z.object({originalname: z.string().regex(/\.(png|jpg|jpeg|gif|webp)$/i,"Only Image Accepted")}).passthrough(),
    owner: z.string(),
})


router.get("/userPotd", authMiddleware, async (req, res) => {
    const userId = req.query.userId; 

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const potd = await Potd.find({ owner: userId });
        const mappedPotd = potd.map(p => ({
            image: p.image,
            createdOn: p.createdOn || "Uploaded On"
        }));
        res.status(200).json(mappedPotd);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Can't fetch POTD for this user" });
    }
});



router.get("/countPotd",authMiddleware,async(req,res)=>{
    try{
        let count = await Products.countDocuments({owner: req.user});
        if(count>=5) return res.status(200).json({bool: true , message: "Max Limit Reached"});
        return res.status(200).json({bool: false , message: "Successful"});}

    catch(err){res.status(400).json({message: "Unsuccessful"})}
})


router.post("/addPotd",authMiddleware,upload.single("image"),async(req,res)=>{
    const inputData = {
        image: req.file,
        owner: req.user}
    let response = potdSchema.safeParse(inputData);
    if(!response.success) return res.status(400).json({message: "Invalid Input"});
    let url;
    try{
        let potdImage = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream({folder:"products"},(err,result)=>{
                if(err) reject(err);
                else resolve(result);})
            stream.end(req.file.buffer);})
        url = potdImage.secure_url;}
    catch(err){
        return res.status(400).json({message: "Unsuccessful"})}
    
    let dbUser = await User.findById(req.user);
    let potdData = {image: url , owner: req.user}
    let newPotd = await Potd.create(potdData);


    await User.findByIdAndUpdate(req.user, { $inc: { points: 1 } });

    return res.status(200).json({message:"Product added successfully", potdId: newPotd._id})

})


router.get("/potdImages", authMiddleware, async (req, res) => {
    try {
        let images = await Potd.find({}, { image: 1, _id: 0 });
        let urls = images.map(img => img.image);

        res.status(200).json({ success: true, images: urls });
    } catch (err) {
        res.status(400).json({ 
            success: false, 
            message: "Unable to fetch images right now" 
        });
    }
});







router.delete("/delete",authMiddleware,async(req,res)=>{
    let productID = req.body.productId;
    try{
        let productDelete = await Products.findByIdAndDelete(productID);
        res.status(200).json({message:"Post deleted successfully"});}
    catch(err){res.status(400).json({message:"Unsuccessful"})}
})




module.exports = router;