const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');

//controller to create a new ride for the user
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const newRide = await rideService.createRide({ userId:req.user._id, pickup, destination, vehicleType });
        res.status(201).json(newRide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating ride' });
    }
};