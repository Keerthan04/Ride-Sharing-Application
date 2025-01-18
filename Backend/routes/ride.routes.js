//router for all rides related routes
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

//create ride(so take userId, source, destination)
router.post('/create',
    body('userId').isString().isLength({min: 24, max: 24}).withMessage('Invalid user id'),
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min: 1}).withMessage('Invalid destination address'),
)

module.exports = router;