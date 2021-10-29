import { createContext, useState, useEffect, useContext} from 'react'

export const ProductContext = createContext();
export const useProductContextProvider = () => useContext(ProductContext);


export default function ProductContextProvider(props) {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let res = await fetch('/api/products');
    res = await res.json();
    setProducts(res);
  }

  const uploadProduct = async (product) => {
    console.log('Came to uploadProduct')
    console.log(product,"product")
    try {
      let res = await fetch('/api/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      console.log(res);
      res = await res.json();
    } catch {
      console.log('Upload did not work')
    }
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