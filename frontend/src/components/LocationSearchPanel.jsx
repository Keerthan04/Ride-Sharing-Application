//on the destination and location clicked the location panel is opened and on click of location the car moto auto panel is opened

const LocationSearchPanel = ({
  // eslint-disable-next-line react/prop-types, no-unused-vars
  setPanelOpen,
  // eslint-disable-next-line react/prop-types
  setvehiclePanelOpen,
}) => {
  //sample array for locations
  const locations = [
    "C-32(B) MIT Quatres,Manipal-576104",
    "abc MIT Quatres,Manipal-576104",
    "cde MIT Quatres,Manipal-576104",
    "Cfcg MIT Quatres,Manipal-576104",
  ];
  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setvehiclePanelOpen(true)
              setPanelOpen(false)//so on click the location is clicked and the vehicle panel is opened and location panel is closed
              }
            }
            className="flex gap-4 border-2 p3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel
