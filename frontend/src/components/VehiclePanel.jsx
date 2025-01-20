/* eslint-disable react/prop-types */

//the car, auto, motor wala panel component to show and on click shd go to details and this will be shown when clicked on location


//so once pickup and destination is selected and find trip button is clicked then this panel will open up to select the vehicle type(the fares got using the backend api) and then on click of any vehicle the confirm ride panel will open up with the details of the selected vehicle and the pickup and destination details

const VehiclePanel = ({
  setvehiclePanelOpen,
  setconfirmRidePanel,
  fare,
  selectVehicle,//so on click of the vehicle that is set up in the vechicletype state in home.jsx that will be passed to the confirm ride panel then
}) => {
  return (
    <div>
      <h5
        //this one down arrow to click and close the panel
        onClick={() => setvehiclePanelOpen(false)}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="ri-arrow-down-wide-line text-xl text-black" />
      </h5>
      <h3 className="text-xl font-semibold mb-3">Choose your ride</h3>

      {/* car card */}
      <div
        // on click on any vehicle this will go to the details of that vehicle panel to open
        onClick={() => {
          setconfirmRidePanel(true);
          selectVehicle("car"); //so that the selected vehicle is shown in the confirm ride panel
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare.car}</h2>
      </div>


      {/* moto card */}
      <div
        onClick={() => {
          setconfirmRidePanel(true);
          selectVehicle("moto");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable MotorCycle rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare.moto}</h2>
      </div>

      {/* auto card */}
      <div
        onClick={() => {
          setconfirmRidePanel(true);
          selectVehicle("auto");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable Auto Rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel
