import { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCaptainData() {

      if (!token) {
        navigate("/captain-login");
      }
      //so since token is for both the user and the captain, we need to make sure that the user is not trying to access the captain's route so we will check the token to see if it is a user's token or a captain's token so sent request to the captain's profile route to get the captain's data and if the token is not valid then we will remove the token from the local storage and redirect the user to the captain login page so that they can login again else we will set the captain's data to the context and set the loading to false
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
    }
    getCaptainData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
