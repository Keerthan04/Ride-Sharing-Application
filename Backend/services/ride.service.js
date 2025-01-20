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


