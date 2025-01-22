//router for all rides related routes
const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');

//create ride(so take  source, destination, vehicle type)
//and use the authUser middleware to check if the user is authenticated and also will get userId from there
router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min: 1}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

//get fare for the ride
router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min: 1}).withMessage('Invalid destination address'),
    rideController.getFare
)

//confirm ride->captain will confirm the ride the first pop up shown to captain and confirm then this route is called
router.post(
    "/confirm",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.confirmRide
);

//when confirm done then the otp and all details asked then start the ride so then this is called
router.get(
    "/start-ride",
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp")
        .isString()
        .isLength({ min: 6, max: 6 })
        .withMessage("Invalid OTP"),
    rideController.startRide
);

//to end the ride in the finish ride pop up this will be called
router.post(
    "/end-ride",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.endRide
);
module.exports = router;