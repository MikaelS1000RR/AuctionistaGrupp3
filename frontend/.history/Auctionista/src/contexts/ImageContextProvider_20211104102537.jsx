import { createContext, useState, useContext, useEffect } from 'react'

export const ImageContext = createContext();
export const useImageContext = () => useContext(ImageContext);
export default function ImageContextProvider (e);

const ImageContextProvider = () => {

    const [image, setImage] = useState([])
    
    const values = {
        image,
        setImage
    }
    
    return ( 
        
        <ImageContext.Provider value={values}>
        {props.children}
      </ImageContext.Provider>
     );
}
 