function imageValidtor(req,res,next){
    let file = req.file;
    if(!file||!file.mimetype.startsWith('image/')) return res.status(400).json({message:"Enter A Valid File"});
    if (file.size > 1 * 1024 * 1024) return res.status(400).json({ messgae: 'File size should be under 1MB.' });
    next();
}