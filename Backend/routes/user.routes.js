const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
//express validator is a package that is used to validate the data that is sent to the server
const userController = require('../controllers/user.controller');
//so the routes will be /user/register

//register route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be atleast 3 characters long'),//since we expect fullname as a object we can use dot notation to access the properties
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
    //so this is how to validate using the express validator
],userController.registerUser);

module.exports = router;