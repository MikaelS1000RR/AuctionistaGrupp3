import { createContext, useState, useContext, useEffect } from 'react'

export const ImageContext = createContext();
export const useImageContext = () => useContext(ImageContext);

const ImageContextProvider = () => {

    const [image, setImage] = useState()
    
    const values = {
        
    }
    
    return ( 
        
        <ImageContext.Provider value={values}>
        {props.children}
      </ImageContext.Provider>
     );
}
 
export default ImageContextProvider;