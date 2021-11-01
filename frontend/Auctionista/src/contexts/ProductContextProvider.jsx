import { createContext, useState, useEffect} from 'react'

export const ProductContext = createContext();

export default function ProductContextProvider(props) {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    /* let res = await fetch('/rest/products');
    res = await res.json(); */
    let res = await fetch('/rest/products');
    res = await res.json();
    console.log(res);
    setProducts(res);
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
    uploadProduct
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}