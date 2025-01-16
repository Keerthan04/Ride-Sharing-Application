import { useState,useRef } from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen,setPanelOpen] = useState(false);
    const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setconfirmRidePanel] = useState(false);
    const [vehicleFound, setvehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    //so useRef is used to get the reference of the element in the dom

    const submitHandler = (e) => {
        e.preventDefault();
    }

    //useGSAP hook we use to make animations
    //to make the effect of panel open and close
    //this one is to open the locations panel on click of the input fields
    useGSAP(
      function () {
        if (panelOpen) {
          gsap.to(panelRef.current, {
            height: "70%",
            padding: 24,
            // opacity:1
          });
          gsap.to(panelCloseRef.current, {
            opacity: 1,
          });
        } else {
          gsap.to(panelRef.current, {
            height: "0%",
            padding: 0,
            // opacity:0
          });
          gsap.to(panelCloseRef.current, {
            opacity: 0,
          });
        }
      },
      [panelOpen]
    );
    
    //this is to transform the vehicle panel(auto car motor wala) when location is clicked so for the panel ref is there and state in location search panel to be true when clicked
    useGSAP(
      function () {
        if (vehiclePanelOpen) {
          gsap.to(vehiclePanelRef.current, {
            transform: "translateY(0)",
          });
        } else {
          gsap.to(vehiclePanelRef.current, {
            transform: "translateY(100%)",
          });
        }
      },
      [vehiclePanelOpen]
    );

    //this one is to handle the confirmed ride panel(after the click on any auto motor or car) then this will open so to handle close and open this is used
    useGSAP(
      function () {
        if (confirmRidePanel) {
          gsap.to(confirmRidePanelRef.current, {
            transform: "translateY(0)",
          });
        } else {
          gsap.to(confirmRidePanelRef.current, {
            transform: "translateY(100%)",
          });
        }
      },
      [confirmRidePanel]
    );

    //this is to handle the looking for driver panel
    useGSAP(
      function () {
        if (vehicleFound) {
          gsap.to(vehicleFoundRef.current, {
            transform: "translateY(0)",
          });
        } else {
          gsap.to(vehicleFoundRef.current, {
            transform: "translateY(100%)",
          });
        }
      },
      [vehicleFound]
    );

    //this is to handle the waiting for driver panel
    useGSAP(
      function () {
        if (waitingForDriver) {
          gsap.to(waitingForDriverRef.current, {
            transform: "translateY(0)",
          });
        } else {
          gsap.to(waitingForDriverRef.current, {
            transform: "translateY(100%)",
          });
        }
      },
      [waitingForDriver]
    );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* image for temporary use  */}
        {/* <LiveTracking /> */}
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0  w-full">
        <div className="h-[30%] p-6 bg-white">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-black text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div> */}
            <input
              onClick={() => setPanelOpen(true)}
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-5 "
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              onClick={() => setPanelOpen(true)}
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
          <button className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            setvehiclePanelOpen={setvehiclePanelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>

      {/* vehicle panel */}
      <div
        //ref to open the panel of vehicle
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        {/* this is the vehicle panel(car, auto, motor) */}
        <VehiclePanel
          setconfirmRidePanel={setconfirmRidePanel}
          setvehiclePanelOpen={setvehiclePanelOpen}
        />
      </div>

      {/* confirmed ride panel */}
      <div
        //ref to open the panel of ride wala once confirmed which vehicle
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        {/* this is the confirmed ride panel */}
        <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}/>
      </div>

      {/* this is the Looking for a Driver panel */}
      <div
        //ref to open the panel of looking for driver
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <LookingForDriver setvehicleFound={setvehicleFound} />
      </div>

      {/* this is the waiting for driver panel */}
        <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} setvehicleFound={setvehicleFound} waitingForDriver={waitingForDriver}/>
        </div>
    </div>
  );
};

export default Home;
