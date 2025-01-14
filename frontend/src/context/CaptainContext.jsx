import React, { useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = React.createContext();
//context for the captain to use the captain data throughout the app

// eslint-disable-next-line react/prop-types
const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
      setCaptain(captainData);
    };

    const value = {
      captain,
      setCaptain,
      isLoading,
      setIsLoading,
      error,
      setError,
      updateCaptain,
    };

    return (
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    );
}

export default CaptainContext
