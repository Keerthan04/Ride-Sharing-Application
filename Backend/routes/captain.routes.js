const express = require('express');
const router = express.Router();
//routers for /captains
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/auth.middleware');
//register route for captain(done checking)
router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Vehicle type must be car, motorcycle or auto'),
],
    captainController.registerCaptain
);

//login route for captain(done checking)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
],captainController.loginCaptain);

//profile route for captain(done checking)
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

//logout route for captain(done checking)
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;