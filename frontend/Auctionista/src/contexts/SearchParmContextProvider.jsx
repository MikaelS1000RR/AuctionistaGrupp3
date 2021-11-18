import { createContext, useContext, useEffect, useState } from "react";

export const SearchParmContext = createContext();
export const useSearchParm = () => useContext(SearchParmContext);

export default function SearchParmContextProvider(props) {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [inputedProduct, setInputedProduct] = useState("");

  const saveSelectedLocation = (location) => {
    setSelectedLocation(location);
    localStorage.setItem("selectedLocation", location);
  };

  const saveSelectedCategory = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const saveInputedProduct = (inputedProduct) => {
    setInputedProduct(inputedProduct);
    localStorage.setItem("selectedCategory", inputedProduct);
  };

  const values = {
    saveSelectedLocation,
    saveSelectedCategory,
    saveInputedProduct,
    selectedLocation,
    selectedCategory,
    inputedProduct,
  };

  useEffect(() => {}, []);

  return (
    <SearchParmContext.Provider value={values}>
      {props.children}
    </SearchParmContext.Provider>
  );
}
