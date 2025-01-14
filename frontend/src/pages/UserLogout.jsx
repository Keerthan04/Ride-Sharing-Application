import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();
    //to handle the logout we need to remove the token from the local storage
    //and then redirect to the login page

    const token = localStorage.getItem('token')
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

  return (
    <div>
      
    </div>
  )
}

export default UserLogout
