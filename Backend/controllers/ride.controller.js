const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

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

        //so whenever a new ride is created we need to send notification to captains who are in radius so first get coordinates then get captains in radius and then send notification to each captain
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );

        ride.otp = "";

        const rideWithUser = await rideModel
            .findOne({ _id: ride._id })
            .populate("user");

        //send notification to all captains in radius(we send the ride details to the captains)
        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
            event: "new-ride",
            data: rideWithUser,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating ride' });
    }
};

//controller to get the fare for the ride
module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting fare' });
    }
}