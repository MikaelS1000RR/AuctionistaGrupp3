import { createContext, useState, useEffect, useContext} from 'react'

export const ProductContext = createContext();
export const useProductContextProvider = () => useContext(ProductContext);

export default function ProductContextProvider(props) {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productsBySearch, setProductsBySearch] = useState([])
  const [productById, setProductById] = useState([]);
  const [highestBidder, setHighestBidder] = useState([]);

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
    let bid = null;
    for(let i = 0; i < arg.length-1; i++) {
      for(let j = i + 1; j < arg.length; j++) {
        if(arg[i].price > arg[j].price) {
          arg[i].bidderTime = arg[i].bidderTime.substring(0, 10);
          bid = arg[i];
        } else {
          arg[j].bidderTime = arg[j].bidderTime.substring(0, 10);
          bid = arg[j];
        }
      }
    }
    setHighestBidder(bid);
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