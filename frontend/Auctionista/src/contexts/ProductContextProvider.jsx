import { createContext, useState, useEffect, useContext} from 'react'
import { useGlobal } from './UserContextProvider';

export const ProductContext = createContext();
export const useProductContextProvider = () => useContext(ProductContext);

export default function ProductContextProvider(props) {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productsBySearch, setProductsBySearch] = useState([])
  const [productById, setProductById] = useState();
  const [highestBidder, setHighestBidder] = useState([]);
  const { userId } = useGlobal();

  const getProducts = async () => {
    let res = await fetch('/api/products');
    res = await res.json();

    res.forEach((products) => {
      let maxBid = 0;
      console.log(products, "products")
      let productBids = products.bids;
      productBids.forEach((bid) => {
        if (bid.price) {
          if (bid.price > maxBid) {
            maxBid = bid.price;
          }
        }
      })
      products.highestBid = maxBid;
      if (products.productOwnerId == userId) {
        products.owner = true;
      } else {
        products.owner = false;
      }
    })
    console.log(res, "ProductContextProvider");
    setProducts(res);
  }

  const getProductById = async (id) => {
    console.log(id,"This is id")
    let res = await fetch('/api/products/' + id);
    res = await res.json();
    console.log(res,"This is res");
    console.log(res.bids);
    getHighestBidder(res.bids);
    setProductById(res);
    /* return res; */
  }

  function getHighestBidder(arg) {
    let highest = arg[0];
    for(let i = 0; i < arg.length; i++) {
      if(arg[i].price > highest.price) {
        highest = arg[i];
      }
    }
    setHighestBidder(highest);
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

  const fetchAllProducts = async () => {
    let res = await fetch('/api/products')
    res = await res.json();
    setAllProducts(res);
  }
  //Get product by search
  const fetchProductBySearch = async searchings => {
    //console.log('searchings', searchings)
    let convertSearchings = 'title=' + searchings.title + '&' + 'locationId=' + searchings.location + '&' + 'categoryId=' + searchings.category
     console.log('convertSearchings', convertSearchings)
    //filters should be an object passed to a query

    let res = await fetch('/api/products/queries?' + convertSearchings, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    res = await res.json()
    res.forEach((products) => {
      let maxBid = 0;
      console.log(products, "products")
      let productBids = products.bids;
      productBids.forEach((bid) => {
        if (bid.price) {
          if (bid.price > maxBid) {
            maxBid = bid.price;
          }
        }
      })
      products.highestBid = maxBid;
      console.log(products.productOwnerId.id, "products.productOwnerId")
      if (products.productOwnerId.id == userId) {
        products.owner = true;
      } else {
        products.owner = false;
      }
    })
    console.log('res', res)
    setProductsBySearch(res)
  }

  useEffect(() => {
    getProducts();
  }, []);

  const values = {
    products,
    getProducts,
    uploadProduct,
    getProductById,
    allProducts,
    fetchAllProducts,
    productsBySearch,
    fetchProductBySearch,
    productById,
    highestBidder,
    setProductsBySearch
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}