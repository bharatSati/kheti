
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { z } = require("zod");
const router = express.Router();
router.use(express.json());
const Feed = require("../db").Feed;
const User = require("../db").User
const authMiddleware = require("../middleware")
const cloudinary = require("../cloudinary.js")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

let feedSchema = z.object({
    image: z.object({originalname: z.string().regex(/\.(png|jpg|jpeg|gif|webp)$/i,"Only Image Accepted")}).passthrough(),
    details: z.string(),
    owner: z.string(),
})




router.post("/addPost",authMiddleware,upload.single("image"),async(req,res)=>{
    const inputData = {
        image: req.file,
        owner: req.user,
        ...req.body,}
    let response = feedSchema.safeParse(inputData);
    if(!response.success) return res.status(400).json({message: "Invalid Input"});
    let url;
    try{
        let feedImage = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream({folder:"products"},(err,result)=>{
                if(err) reject(err);
                else resolve(result);})
            stream.end(req.file.buffer);})
        url = feedImage.secure_url;}
    catch(err){
        return res.status(400).json({message: "Unsuccessful"})}
    
    let dbUser = await User.findById(req.user);
    let feedData = {image: url , owner: req.user, ownerAvatar:dbUser.avatar, ownerName: dbUser.name ,latitude: dbUser.latitude , longitude: dbUser.longitude , ...req.body}
    let newPost = await Feed.create(feedData);
    return res.status(200).json({message:"Posted successfully", productId: newPost._id})

})





function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = deg => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

router.get("/getFeed", authMiddleware, async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) return res.status(400).json({ message: "Latitude and longitude required" });

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

    
        let feedPosts = await Feed.find({}).populate("owner");

        
        feedPosts = feedPosts.filter(post => post.owner && typeof post.owner.latitude === "number" && typeof post.owner.longitude === "number");

      
        feedPosts = feedPosts.map(post => {
            const distance = getDistance(lat, lon, post.owner.latitude, post.owner.longitude);
            return {
                ...post._doc,
                distance,
                ownerName: post.owner.name,
                ownerAvatar: post.owner.avatar,
                city: post.owner.city,
                latitude: post.owner.latitude,
                longitude: post.owner.longitude,
            };
        });

      
        feedPosts.sort((a, b) => a.distance - b.distance);

        res.status(200).json({ success: true, posts: feedPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Unable to fetch posts" });
    }
});




module.exports = router;