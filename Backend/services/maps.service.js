const axios = require('axios');
const captainModel = require('../models/captain.model');


//to handle the api call where we will get the coordinates of the address
module.exports.getAddressCoordinates = async (address)=>{ 
    if(!address){
        throw new Error('Address is required');
    }
    const apikey = process.env.GOOGLE_MAPS_API;//shd set up
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;//to get the coordinates of the address
    try {
        const response = await axios.get(url);
        if(response.data.status === 200){
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            }
        } else {
            throw new error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;    }
}

//to handle the api call where we will get the distance and time between two places
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === "OK") {
        if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
            throw new Error("No routes found");
        }

        return response.data.rows[0].elements[0];
      } else {
        throw new Error("Unable to fetch distance and time");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};


//to handle the api call where we will get the suggestions for the address
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};


//so what we do is when ever ride is created and stored in backend we need to send the notification for all the captains in the radius of that pickup location so that they can accept the ride so for that we need to get all the captains near that location and for that we use this function
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km

  //mongodb does this and gives us we just use it
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};