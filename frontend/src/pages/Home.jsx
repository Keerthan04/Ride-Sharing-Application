import { useState,useRef,useContext,useEffect } from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import {SocketContext} from "../context/SocketContext";
import {UserDataContext} from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    //all the states are used to handle the state of the application
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen,setPanelOpen] = useState(false);
    const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setconfirmRidePanel] = useState(false);
    const [vehicleFound, setvehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState('car');
    const [ride, setRide] = useState(null);

    const navigate = useNavigate();
    //all the refs are used to get the reference of the element in the dom
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    //so useRef is used to get the reference of the element in the dom

    //Socket Information
    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);
    //so here since home of user is only for logged in users what we do is we join the room with the user type and user id so that we store the socketId of the user in the database(so this happens every time the component is mounted so that we can get the socketId of the user)
    useEffect(() => {
      socket.emit("join", { userType: "user", userId: user._id });
    }, [socket, user]);

    //so once the ride is confirmed by the captain then the ride-confirmed event is triggered and the ride details are sent to the user so that the user can see the details of the ride
    socket.on("ride-confirmed", (ride) => {
      setvehicleFound(false);
      setWaitingForDriver(true);//so now close the vehicle found panel and open the waiting for driver panel
      setRide(ride);
    });

    //so once the ride is started by the captain then the ride-started event is triggered and the ride details are sent to the user so that the user can see the details of the ride
    socket.on("ride-started", (ride) => {
      console.log("ride");
      setWaitingForDriver(false);
      navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
    });

    //Todo->on each letter change the request is going to the backend(so too many requests are going so we need to optimize this(like debouncing))
    //so for both it is the input as query params so we are using the same function(same input in params and sending the response)
    const handlePickupChange = async (e) => {
      setPickup(e.target.value);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } catch {
        // handle error
      }
    };

    const handleDestinationChange = async (e) => {
      setDestination(e.target.value);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      } catch {
        // handle error
      }
    };

    //so once both pickup and destination is selected by the user then on click of the find trip button this is triggered and fare is calculated which shd be shown in that panel of vehicles
    async function findTrip() {
      setvehiclePanelOpen(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(response.data);
    }

    //so once the user selects the vehicle it will be stored in the vehicle type state so use that and then we will create the ride
    async function createRide() {
      //no response handling as of now
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }



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
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        {/* Location serach panel */}
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setvehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
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
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>

      {/* confirmed ride panel */}
      <div
        //ref to open the panel of ride wala once confirmed which vehicle
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        {/* this is the confirmed ride panel */}
        <ConfirmedRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setconfirmRidePanel={setconfirmRidePanel}
          setvehicleFound={setvehicleFound}
        />
      </div>

      {/* this is the Looking for a Driver panel */}
      <div
        //ref to open the panel of looking for driver
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setvehicleFound={setvehicleFound}
        />
      </div>

      {/* this is the waiting for driver panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride= {ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
