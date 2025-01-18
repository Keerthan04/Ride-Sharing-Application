const express = require('express');
const router = express.Router();
const mapController = require('../controllers/maps.controller');
const authMiddleware = require("../middleware/auth.middleware");
const { query } = require('express-validator');

//using the address and send back the coordinates using the maps service and also this shd be only for the authenticated users
router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}).withMessage('Address must be at least 3 characters long'),//address should be string and min 3 characters so we use the query to validate the address
    authMiddleware.authUser , mapController.getCoordinates
);

//another route where given two places ka coordinates we will get the distance between them and time to cover the distance
router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}).withMessage('Origin must be at least 3 characters long'),//origin should be string and min 3 characters so we use the query to validate the origin)
    query('destination').isString().isLength({min: 3}).withMessage('Destination must be at least 3 characters long'),//destination should be string and min 3 characters so we use the query to validate the destination
    authMiddleware.authUser , mapController.getDistanceTime
);

//to get the suggestions for the address and this shd be only for the authenticated users
router.get(
    "/get-suggestions",
    query("input").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);
module.exports = router;