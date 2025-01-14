import { useState,useRef } from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen,setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    //so useRef is used to get the reference of the element in the dom

    const submitHandler = (e) => {
        e.preventDefault();
    }

    //useGSAP hook we use to make animations
    //to make the effect of panel open and close
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
          <LocationSearchPanel />
        </div>
      </div>
      <div className="fixed w-full z-10 bottom-0 bg-white px-3 py-6">
        <h3 className="text-xl font-semibold mb-3">Choose your ride</h3>
        <div className="flex border-2 border-black mb-2 rounded-xl w-full p-3  items-center justify-between">
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
          <h2 className="text-xl font-semibold">193.20</h2>
        </div>

        <div className="flex border-2 border-black mb-2 rounded-xl w-full p-3  items-center justify-between">
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
          <h2 className="text-xl font-semibold">65.17</h2>
        </div>

        <div className="flex border-2 border-black mb-2 rounded-xl w-full p-3  items-center justify-between">
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
          <h2 className="text-xl font-semibold">118.21</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
