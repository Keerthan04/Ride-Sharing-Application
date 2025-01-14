// import {useContext} from 'react'
import { useEffect,useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const UserProtectedWrapper = ({children}) => {
    //this is a wrapper component that will be used to protect routes that are only accessible to logged in users so only if token is there only then user can access the route of /home and all else redirect to /login

    const navigate = useNavigate()

    // const { user } = useContext(UserDataContext);
    //dont depend on context user data as if reloads then it will be lost so use local storage to store the token and based on that we do the routing

    const token = localStorage.getItem('token')
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        if (!token) {
          navigate("/login");
        }
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setUser(response.data);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            navigate("/login");
          });
    },[navigate, setUser, token])
    //useEffect will run only once when the component is mounted and then it will check if token is there or not and based on that it will redirect to login page(IMP)
    //if token exist we will render the children else we will redirect to login page
    if (isLoading) {
      return <div>Loading...</div>;
    }
  return (
    <>{children}</>
  )
}

export default UserProtectedWrapper
