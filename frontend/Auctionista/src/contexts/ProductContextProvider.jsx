import { createContext, useState, useEffect } from 'react'

export const ProductContext = createContext();
export const useGlobalProduct = () => useContext(ProductContext);

export default function ProductContextProvider(props) {

  const [allProducts, setAllProducts] = useState([]);
  const [productsBySearch, setProductsBySearch] = useState([])

  const fetchAllProducts = async () => {
    let res = await fetch('/rest/products')
    res = await res.json();
    setAllProducts(res);
  }

  const uploadProduct = async (product) => {
    let res = await fetch('/rest/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
    console.log(res);
    res = await res.json();
  }

 

  //Get product by search
  const fetchProductBySearch = async searchings => {
    // searchings = JSON.stringify(searchings)
    console.log('searchings', searchings)
    /* let title = ''
    let locationId = null
    let categoryId = null
    let resOriginal = '/rest/products/queries?'
    if (searchings.title !== null) {
      title = 'title=' + "'" + searchings.title + "'"
    }
    if (searchings.locationId !== null) {
      locationId = 'locationId=' + searchings.location
    }

    if (searchings.category !== null) {
      categoryId = 'categoryId=' + searchings.category
    }
 */
    let convertSearchings = 'title='  + searchings.title  + '&' + 'locationId=' + searchings.location + '&' +'categoryId='+searchings.category
    console.log('convertSearchings', convertSearchings)
    //filters should be an object passed to a query
/* 
    let res = await fetch('/rest/products/queries?' + convertSearchings, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    res = await res.json() */
    console.log('res', res)
    setProductsBySearch(res)
  }

  // Hook
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  const values = {
    allProducts,
    fetchAllProducts,
    uploadProduct,
    productsBySearch,
    fetchProductBySearch
  };

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}