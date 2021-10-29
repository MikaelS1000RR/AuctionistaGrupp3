import { createContext, useState, useEffect } from 'react'

export const ProductContext = createContext();

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
    seachings = JSON.stringify(searchings)
    //filters should be an object passed to a query
    let res = await fetch('/rest/products/queries/' + searchings, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    res = await res.json()
    setProductsBySearch(res)
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