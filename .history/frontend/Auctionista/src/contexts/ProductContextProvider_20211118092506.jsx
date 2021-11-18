import { createContext, useState, useEffect, useContext } from "react";
import { useGlobal } from "./UserContextProvider";

export const ProductContext = createContext();
export const useProductContextProvider = () => useContext(ProductContext);

export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productsBySearch, setProductsBySearch] = useState([]);
  const [productById, setProductById] = useState();
  const [highestBidder, setHighestBidder] = useState([]);
  const [notFound, setSearchNotFound] = useState("");
  const { userId, whoAmI } = useGlobal();

  const getProducts = async () => {
    let res = await fetch("/api/products");
    res = await res.json();

    res.forEach((products) => {
      let maxBid = 0;
      let productBids = products.bids;
      productBids.forEach((bid) => {
        if (bid.price) {
          if (bid.price > maxBid) {
            maxBid = bid.price;
          }
        }
      });
      products.highestBid = maxBid;
      if (products.productOwnerId.id == userId) {
        products.owner = true;
      } else {
        products.owner = false;
      }
    });
    setProducts(res);
  };

  const getProductById = async (id) => {
    let res = await fetch("/api/products/" + id);
    res = await res.json();
    let isUserHighestBidder = false;
    let highestBidderId = 0;
    let maxBid = 0;
    if (res.bids.length > 0) {
      let bids = res.bids;
      bids.forEach((bid) => {
        if (bid.price > maxBid) {
          maxBid = bid.price;
          highestBidderId = bid.bidderId.id;
          if (highestBidderId == userId) {
            isUserHighestBidder = true;
          } else {
            isUserHighestBidder = false;
          }
        }
      });
    }
    res.isUserHighestBidder = isUserHighestBidder;

    let currentDate = new Date();
    let lastBidDate = res.endDate;
    if (currentDate > lastBidDate) {
      res.expired = true;
    } else {
      res.expired = false;
    }
    if (res.productOwnerId.id == userId) {
      res.owner = true;
    } else {
      res.owner = false;
    }
    let endDateFromBackend = res.endDate;
    endDateFromBackend = new Date(parseInt(endDateFromBackend));
    endDateFromBackend = endDateFromBackend.toISOString();
    endDateFromBackend = endDateFromBackend.slice(0, 10);
    res.endDate = endDateFromBackend;

    getHighestBidder(res.bids);
    setProductById(res);
  };

  function getHighestBidder(arg) {
    let highest = arg[0];
    for (let i = 0; i < arg.length; i++) {
      if (arg[i].price > highest.price) {
        highest = arg[i];
      }
    }
    setHighestBidder(highest);
  }

  const uploadProduct = async (product) => {
    try {
      let res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      let status = res.status;
      res = await res.json();
      return status;
    } catch {
      console.log("Upload did not work");
      return "ERROR";
    }
  };

  const fetchAllProducts = async () => {
    let res = await fetch("/api/products");
    res = await res.json();
    setAllProducts(res);
  };
  //Get product by search
  const fetchProductBySearch = async (searchings) => {
    let convertSearchings =
      "title=" +
      searchings.title +
      "&" +
      "locationId=" +
      searchings.location +
      "&" +
      "categoryId=" +
      searchings.category +
      "&" +
      "onSell=" +
      searchings.onSell;
    //filters should be an object passed to a query
    console.log("convertSearchings", convertSearchings);
    let res = await fetch("/api/products/queries?" + convertSearchings, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    res = await res.json();
    if (res.status == 404) {
      setProductsBySearch([]);
      setSearchNotFound("No matching results found...");
      return;
    }
    res.forEach((products) => {
      let maxBid = 0;
      let productBids = products.bids;
      let currentDate = new Date().getTime();
      let lastBidDate = products.endDate;
      let isUserHighestBidder = false;
      let highestBidderId = 0;
      if (currentDate > lastBidDate) {
        products.expired = true;
      } else {
        products.expired = false;
      }
      productBids.forEach((bid) => {
        if (bid.price) {
          if (bid.price > maxBid) {
            maxBid = bid.price;
            highestBidderId = bid.bidderId.id;
            if (highestBidderId == userId) {
              isUserHighestBidder = true;
            } else {
              isUserHighestBidder = false;
            }
          }
        }
      });
      products.highestBid = maxBid;
      products.isUserHighestBidder = isUserHighestBidder;
      if (products.productOwnerId.id == userId) {
        products.owner = true;
      } else {
        products.owner = false;
      }
      let endDateFromBackend = products.endDate;
      endDateFromBackend = new Date(parseInt(endDateFromBackend));
      endDateFromBackend = endDateFromBackend.toISOString();
      endDateFromBackend = endDateFromBackend.slice(0, 10);
      products.endDate = endDateFromBackend;
    });
    setProductsBySearch(res);
    setSearchNotFound("");
  };

  useEffect(() => {
    getProducts();
    whoAmI();
  }, [userId]);

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
    setProductsBySearch,
    notFound,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}
