import { createContext, useState,useContext,useEffect } from 'react'

export const CategoryContext = createContext();
export const useGlobalCategory = () => useContext(CategoryContext);

export default function CategoryContextProvider(props) {

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    let res = await fetch('/rest/categories');
    res = await res.json();
    setCategories(res);
  }
  const values = {
    getCategories,
    categories
  };

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
}