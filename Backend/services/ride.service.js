const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

//function to calculate fares
async function calculateFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    //get the distance and time between the two places
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    //now to calculate the fare
    const baseFare = {
      auto: 30,
      car: 50,
      moto: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };

    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distanceTime.distance.value / 1000) * perKmRate.auto +
          (distanceTime.duration.value / 60) * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKmRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car
      ),
      moto: Math.round(
        baseFare.moto +
          (distanceTime.distance.value / 1000) * perKmRate.moto +
          (distanceTime.duration.value / 60) * perMinuteRate.moto
      ),
    };

    return fare;
}
module.exports.getFare = calculateFare;

//once ride is complete or created we need to send otp to the user
function getOtp(num){
    function generateOtp(num) {
      const otp = crypto
        .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
        .toString();
      return otp;
    }
    return generateOtp(num);
}

//function to create a new ride
module.exports.createRide = async(
    {
        userId,pickup,destination,vehicleType
    }
)=>{
    if (!userId || !pickup || !destination || !vehicleType) {
      throw new Error("All fields are required");
    }
    const fare = await calculateFare(pickup,destination);
    const newRide = await rideModel.create({
        user:userId,
        pickup:pickup,
        destination:destination,
        otp:getOtp(6),//to send 6digit otp to the user
        fare:fare[vehicleType],
    });
    return newRide;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",//since accepted we will assign the captain to the ride and make accepted
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")//so we will send ride with user and captain details
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};

