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
        const pickupCoordinates = await mapService.getAddressCoordinates(
          pickup
        );

        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );

        ride.otp = "";

        //what we need to send is complete ride details with user details
        const rideWithUser = await rideModel
            .findOne({ _id: ride._id })
            .populate("user");//what populate does is it will get the user details from the user collection and add it to the ride object so both user and ride details are sent to the captains

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

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({
        rideId,
        captain: req.captain,
        });

        //once the ride is confirmed we need to send the ride details to the user so that user will get the notification that ride is confirmed
        sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride,
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({
        rideId,
        otp,
        captain: req.captain,
        });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
        event: "ride-started",
        data: ride,
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
        event: "ride-ended",
        data: ride,
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    s;
};