import { createContext, useState, useContext, useEffect } from 'react'

export const ImageContext = createContext();
export const useImageContext = () => useContext(ImageContext);

const ImageContextProvider = () => {

    
    
    return ( 
        
  


        <LocationContext.Provider value={values}>
        {props.children}
      </LocationContext.Provider>
     );
}
 
export default ImageContextProvider;