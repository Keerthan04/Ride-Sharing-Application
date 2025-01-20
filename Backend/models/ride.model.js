const mongoose = require("mongoose");

//model for ride handling
const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //this is the id of the user who is booking the ride and we tell this to be of type ObjectId(the normal id type in mongodb)
    ref: "user", //this is the reference to the user model
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId, //this is the id of the captain who is accepting the ride and we tell this to be of type ObjectId(the normal id type in mongodb)
    ref: "captain", //this is the reference to the captain model
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },

  duration: {
    type: Number,
  }, // in seconds

  distance: {
    type: Number,
  }, // in meters

  paymentID: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  //all these three above to maintain the payment details

  //so when created we will send otp to the user that he shd use so stored here
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model("ride", rideSchema);
