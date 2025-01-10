const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistedTokens = require('../models/blacklistedTokens.model');

//middleware to check if the user is authenticated
module.exports.authUser = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];//as bearer it is there
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const isBlackListed = await blacklistedTokens.findOne({ token });//so we are checking if the token is blacklisted or not
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);//so we are verifying the token and decoded will have id as we have passed id in the payload
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }

}