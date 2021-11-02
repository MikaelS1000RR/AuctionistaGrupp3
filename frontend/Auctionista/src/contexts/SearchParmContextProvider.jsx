import { createContext, useState, useContext, useEffect } from 'react'

export const SearchParmContext = createContext();
export const useGlobalSearchParm= () => useContext(SearchParmContext);

export default function SearchParmContextProvider(props) {

  const [location, setLocation] = useState(0);
  const [category, setCategory] = useState(0);
  const [inputedProduct, setInputedProduct] = useState([]);

  const saveSelectedLocation = (location) => {
    setLocation(location)
    localStorage.setItem('selectedLocation', location)
  }

  const saveSelectedCategory = (category) => {
    setCategory(category)
    localStorage.setItem('selectedCategory', category)
  }

  const saveInputedProduct = (inputedProduct) => {
    setInputedProduct(inputedProduct)
    localStorage.setItem('selectedCategory', inputedProduct)
  }
  
  const values = {
    saveSelectedLocation,
    saveSelectedCategory,
    saveInputedProduct
  };

  useEffect(() => {
  }, [])


  return (
    <SearchParmContext.Provider value={values}>
      {props.children}
    </SearchParmContext.Provider>
  );
}