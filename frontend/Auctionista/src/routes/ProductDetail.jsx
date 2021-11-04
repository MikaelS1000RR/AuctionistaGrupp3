import React, { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router";
import { useProductContextProvider } from '../contexts/ProductContextProvider'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "reactstrap";
import '../css/ProductDetail.css'
import UploadIcon from '../assets/icons/UploadIcon.svg';
import UserIcon from '../assets/icons/UserIcon.svg';
// import jojo from '.../'

const ProductDetail = (props) => {
  const { id } = useParams();
  const { getProductById, productById, highestBidder} = useProductContextProvider();
  const productId = id;
  const [imgFile, setImgFile] = useState('https://i.kym-cdn.com/photos/images/newsfeed/001/488/696/0e7.jpg');

  console.log(props)
  console.log(productId)
  console.log(productById)
  console.log(highestBidder);
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    await getProductById(id);
    setProduct(productById)
    /* console.log(response, "THIS IS response") */
  }


  /* function getHighestBidder() {
    let bids = productById.bids;
    let bid = null;
    for(let i = 0; i < bids.length-1; i++) {
      for(let j = i + 1; j < bids.length; j++) {
        if(bids[i].price > bids[j].price) {
          bids[i].bidderTime = bids[i].bidderTime.substring(0, 10);
          bid = bids[i];
        } else {
          bids[j].bidderTime = bids[j].bidderTime.substring(0, 10);
          bid = bids[j];
        }
      }
    }
    setHighestBidder(bid);
  } */

  useEffect(() => {
    getProduct()
  }, [])

  /* useEffect(() => {
    getHighestBidder()
  }, []) */

  return (
    <div>
    {productById && <div className="container">
      <img src={imgFile} className="singleimg"/>
      <div className="infowrap">
        <p className="category-location">{productById.categoryId.name} • {productById.locationId.name}</p>
        <p className="product-title">{productById.title}</p>
        <p className="product-brand">{productById.brand}</p>
        <p className="description-price">Price</p>
        <p className="product-price">{productById.startingPrice}</p>
        <p className="description-condition">Condition</p>
        <p className="product-condition">{productById.condition}</p>
        <p className="description-details">Details</p>
        <p className="product-details">{productById.details}</p>
        <p className="description-endDate">Ends</p>
        <p className="product-endDate">{productById.endDate}</p>
      </div>
      <hr className="hr-break"/>
      <div className="middle-container">
        <p className="description-title">Description</p>
        <div className="description-wrap">
          <p className="product-description">{productById.description}</p>
        </div>
        <p className="description-bidding">Bidding</p>
        {productById.bids.length == 0 && 
          <div className="nobids-wrap">
            <p className="product-bidding">0 bids</p> 
            <div className="bidbtn-wrap">
              <button className="nobids-btn">
                <img src={UploadIcon}/>
                <p className="bidbtn-text">Place bid</p>
              </button>
            </div>
          </div>
        }
        {productById.bids.length > 0 && highestBidder && 
          <div className="bidswrap">
            <p className="product-bidding">{productById.bids.length} bids</p>
            <div className="highestbidder">
              <img src={UserIcon} className="avatar"/>
              <p className="highestbidder-user">{highestBidder.bidderId.username}</p>
              <p className="highestbid-price">{highestBidder.price}</p>
              <p className="bidDate">{highestBidder.bidderTime}</p>
            </div>
            <div className="bidbtn-wrap">
              <button className="placebid">
                <img src={UploadIcon}/>
                <p className="bidbtn-text">Place bid above leading price</p>
              </button>
            </div>
          </div>
        }
        <hr className="hr-break"/>
        <p className="seller-title">Seller</p>
        <div className="sellercontainer">
          <img src={UserIcon} className="seller-icon"/>
          <p className="seller">{productById.productOwnerId.username}</p>
        </div>
      </div>
    </div>}
    </div>
   );
}
 
export default ProductDetail;
