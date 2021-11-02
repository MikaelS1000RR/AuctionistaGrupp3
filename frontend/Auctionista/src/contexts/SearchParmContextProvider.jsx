import { createContext, useState, useContext, useEffect } from 'react'

export const SearchParmContext = createContext();
export const useGlobalSearchParm= () => useContext(SearchParmContext);

export default function SearchParmContextProvider(props) {

  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputedProduct, setInputedProduct] = useState([]);

  const saveLocation = (location) => {
    setLocation(location)
    localStorage.setItem('selectedLocation', location)
  }

  const saveCategory = (category) => {
    setCategory(category)
    localStorage.setItem('selectedCategory', category)
  }

  const saveInputedProduct = (inputedProduct) => {
    setInputedProduct(inputedProduct)
    localStorage.setItem('selectedCategory', inputedProduct)
  }
  
  const values = {
    saveLocation,
    saveCategory,
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