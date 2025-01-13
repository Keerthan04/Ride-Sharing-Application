import React, { useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = React.createContext()//create a context
//so this context we will use to centralize the user data and provide it to all the components

// eslint-disable-next-line react/prop-types
const UserContext = ({children}) => {

    const [user, setUser] = useState({
      email: "",
      fullName: {
        firstName: "",
        lastName: "",
      },
    });
  return (
    <div>
        <UserDataContext.Provider value={{user, setUser}}>{/*now provide the data as context to all the components so in main.jsx also we wrap the app component with this and children so all will get and display children
        
        then in all components i can just do const {user, setUser} = useContext(UserDataContext); and use the data
        */}
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
