//all the functions that are called when the user routes are hit are defined in the controllers

const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
//the express validator used in the route will validate and this controller will get the errors and all in validationResult
const blackListedTokens = require('../models/blacklistedTokens.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //so some error in validation(for register check firstname and email and password)
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  
  const isUserAlreadyExists = await userModel.findOne({
    email,
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);
  //here as we are using the static method we can call it on the model itself
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  //this is a method that is not static so we can call it on the instance of the model
  res.status(201).json({ user, token });
};


//controller for login handling
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //so some error in validation(for login check email and password)
  const { email, password } = req.body;
  const user = await userModel.findOne({ email}).select('+password');
  //so we are using the select method to get the password as we have set select to false in the schema for the password
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie('token',token)
  res.status(200).json({ user, token });
}

//controller for getting the user profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
}

//controller for logging out the user
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blackListedTokens.create({token});//so add the token to the blacklisted tokens
  
  res.status(200).json({message:'Logged out successfully'});
}