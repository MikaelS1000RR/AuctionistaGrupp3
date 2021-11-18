import { createContext, useContext, useState } from "react";

export const ImageContext = createContext();
export const useImageContext = () => useContext(ImageContext);

const ImageContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const values = {
    images,
    setImages,
  };

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};
export default ImageContextProvider;
