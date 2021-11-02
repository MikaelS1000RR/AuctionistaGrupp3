import { createContext, useState, useContext, useEffect } from 'react'

export const SearchParmContext = createContext();
export const useSearchParm = () => useContext(SearchParmContext);

export default function SearchParmContextProvider(props) {

  const [selectedLocation, setSelectedLocation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [inputedProduct, setInputedProduct] = useState('');
  

  const saveSelectedLocation = (location) => {
    console.log('location', location)
    setSelectedLocation(location)
    console.log(selectedLocation)
    localStorage.setItem('selectedLocation', location)
  }

  const saveSelectedCategory = (category) => {
    console.log('category', category)
    setSelectedCategory(category)
    console.log(selectedCategory)
    localStorage.setItem('selectedCategory', category)
  }

  const saveInputedProduct = (inputedProduct) => {
    console.log('inputedProduct',inputedProduct)
    setInputedProduct(inputedProduct)
    console.log(inputedProduct)
    localStorage.setItem('selectedCategory', inputedProduct)
  }
  
  const values = {
    saveSelectedLocation,
    saveSelectedCategory,
    saveInputedProduct,
    selectedLocation,
    selectedCategory,
    inputedProduct

  };

  useEffect(() => {
  }, [])


  return (
    <SearchParmContext.Provider value={values}>
      {props.children}
    </SearchParmContext.Provider>
  );
}