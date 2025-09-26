require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("hello")
        return res.status(401).json({ signedOut:true , message: 'Please Login or make new account' });
    }
    let token = authHeader.split(" ")[1];
    try{

        let decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded.userID;
        next();}
    catch(err){
        return res.status(403).json({signedOut:true,message:"Invalid Token"})
    }
}

module.exports = authMiddleware;