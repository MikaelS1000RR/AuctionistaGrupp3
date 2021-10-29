import { createContext, useState, useEffect} from 'react'

export const ProductContext = createContext();

export default function ProductContextProvider(props) {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let res = await fetch('/rest/products');
    res = await res.json();
    setProducts(res);
  }

  const uploadProduct = async (product) => {
    let res = await fetch('/api/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
    console.log(res);
    res = await res.json();
  }

  const values = {
    products,
    getProducts,
    uploadProduct
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}