//all the functions that are called when the routes are hit are defined in the controllers

const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
//the express validator used in the route will validate and this controller will get the errors and all in validationResult

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //so some error in validation(for register check firstname and email and password)
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
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
