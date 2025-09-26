const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();
const User = require("../db").User
const authMiddleware = require("../middleware")
const cloudinary = require("../cloudinary.js")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const signupSchema = z.object({
    username: z.string().min(4,"Username must be at least 4 characters long"),
    password: z.string().min(8,"Password must be at least 8 characters long"),
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                




router.post("/signup",async (req,res)=>{
    let inputData = req.body;
    let response = signupSchema.safeParse(inputData);
    if(!response.success){
        const firstError = response.error.message;
        const parsedErrors = JSON.parse(firstError);
        return res.status(400).json({message: parsedErrors[0].message});}


        try{
            const user = await User.findOne({
            username: inputData.username
        })
    
    if(user) return res.status(400).json({message:"Username already taken !!"});

    const dbUser = await User.create(inputData);
    const token = jwt.sign({
        userID: dbUser._id
    }, process.env.JWT_SECRET)

    return res.status(200).json({
        message: "Welcome aboard 🎉 Your account has been created successfully!",
        token: token})
        }

       catch(err){ res.status(400).json({message: "Please try again later !"}) }
})




router.post("/signin",(req,res)=>{
    let inputData = req.body;
    let users = User.find()
    .then((users)=>{
        let flag = false;
    let dbUser;
    for(let i = 0;i<users.length;i++){
        if(users[i].username==inputData.username&&users[i].password==inputData.password){
            dbUser = users[i];
            flag = true;
            break;}
        }
    if(!flag) return res.status(400).json({message: "Wrong UserName Or Password !!"});
    let token = jwt.sign({
        userID: dbUser._id,
    },process.env.JWT_SECRET)
    res.status(200).json({
        message: "Successfullyt Logged In",
        token: token})
    })
    .catch(()=>{
        res.status(400).json({message:"An Error Occured"})
    })
})



const updateInfoSchema = z.object({
    avatar: z.any().optional(), 
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    contact: z.string().min(10, "Contact description must be at least 10 characters").optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    city: z.string().optional()
});

router.put("/update", authMiddleware, upload.single("avatar"), async (req, res) => {
    try {
        const inputData = {
            avatar: req.file || null,  
            name: req.body.name,
            password: req.body.password,
            contact: req.body.contact,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            city: req.body.city
        };

     
        const response = updateInfoSchema.safeParse(inputData);
        if (!response.success) {
            const firstError = response.error.errors[0].message;
            return res.status(400).json({ message: firstError });
        }

        let avatarUrl;
      
        if (req.file) {
            const imageUpload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "userImage" },
                    (error, result) => (error ? reject(error) : resolve(result))
                );
                stream.end(req.file.buffer);
            });
            avatarUrl = imageUpload.secure_url;
        }

        const updatedInfo = {
            name: inputData.name,
            password: inputData.password,
            contact: inputData.contact,
        };

        if (avatarUrl) updatedInfo.avatar = avatarUrl;
        if (inputData.latitude) updatedInfo.latitude = parseFloat(inputData.latitude);
        if (inputData.longitude) updatedInfo.longitude = parseFloat(inputData.longitude);
        if (inputData.city) updatedInfo.city = inputData.city;

        const updatedUser = await User.findByIdAndUpdate(req.user, updatedInfo, { new: true });

        return res.status(200).json({ message: "Update Successful", user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Update Unsuccessful" });
    }
});



router.get("/profile",authMiddleware,async (req,res) =>{
    let reqId  = req.user;
    console.log("bharat")
    if(req.query.id!="null") reqId = req.query.id 
    
    const userId = req.user;
    try {
        const user = await User.findById(reqId);
        const finalUser = user.toObject();
        if(userId==reqId) finalUser.same = true;
        else finalUser.same = false;
        res.status(200).json({finalUser,reqId})}
    catch(err){ res.status(200).json({message: err});}
})



router.get("/me",authMiddleware,async (req,res) =>{
    const userId = req.user;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user)}
    catch(err){ res.status(400).json({message: err});}
})




router.get("/check",authMiddleware,(req,res)=>{
    res.status(200).json({message:"User Already Signed in"})
})


module.exports = router; 