import { createContext, useState, useContext, useEffect } from 'react'

export const LocationContext = createContext();
export const useGlobalLocation = () => useContext(LocationContext);


export default function LocationContextProvider(props) {

  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    let res = await fetch('/rest/locations');
    res = await res.json();
    setLocations(res);
  }
  const values = {
    getLocations,
    locations
  };

  useEffect(() => {  
      getLocations()
  }, [])


  return (
    <LocationContext.Provider value={values}>
      {props.children}
    </LocationContext.Provider>
  );
}