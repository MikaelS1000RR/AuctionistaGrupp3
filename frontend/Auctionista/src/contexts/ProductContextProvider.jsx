/* import { createContext, useState, useEffect } from 'react'

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
    console.log('searchings', searchings)
    let convertSearchings = 'title='  + searchings.title  + '&' + 'locationId=' + searchings.location + '&' +'categoryId='+searchings.category
    console.log('convertSearchings', convertSearchings)
    //filters should be an object passed to a query

    let res = await fetch('/rest/products/queries?' + convertSearchings, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    res = await res.json()
    console.log('res', res)
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
 */



  

import { createContext, useState, useEffect, useContext} from 'react'

export const ProductContext = createContext();
export const useProductContextProvider = () => useContext(ProductContext);

export default function ProductContextProvider(props) {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    /* let res = await fetch('/rest/products');
    res = await res.json(); */
    let res = await fetch('/api/products');
    res = await res.json();
    console.log(res);
    setProducts(res);
  }
  const getProductById = async (id) => {
    console.log(id,"This is id")
    let res = await fetch('/api/products/' + id);
    res = await res.json();
    console.log(res,"This is res");
    return res;
  }

  const uploadProduct = async (product) => {
    console.log(product, "product")
    try {
      let res = await fetch('/api/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      console.log(res);
      let status = res.status;
      res = await res.json();
      return status;
    } catch {
      console.log('Upload did not work')
      return 'ERROR'
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const values = {
    products,
    getProducts,
    uploadProduct,
    getProductById
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}