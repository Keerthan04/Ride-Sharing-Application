/* eslint-disable react/prop-types */

//when riding the captain can finish the ride by clicking on the "Complete Ride" button and this is shown at time of when the captain is riding the user

//so when in captain-riding route and on click on the above arrow or complete ride button, the finish ride panel will be shown and here he can click finish and backend and all call will go and redirect to captain home page
const FinishRide = ({ setFinishRidePanel }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-black ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {/* {props.ride?.user.fullname.firstname} */}
            user name
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {/* {props.ride?.pickup} */}
                pickup
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {/* {props.ride?.destination} */}
                destination
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                {/* ₹{props.ride?.fare}  */}
                Fare
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          <button className="w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
