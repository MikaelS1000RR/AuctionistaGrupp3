import { createContext, useState, useContext, useEffect } from 'react'

export const ImageContext = createContext();
export const useImageContext = () => useContext(ImageContext);

const ImageContextProvider = () => {

    const []
    
    const values = {
        
    }
    
    return ( 
        
        <ImageContext.Provider value={values}>
        {props.children}
      </ImageContext.Provider>
     );
}
 
export default ImageContextProvider;