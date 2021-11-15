import React, { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router";
import { useProductContextProvider } from '../contexts/ProductContextProvider'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "reactstrap";
import '../css/ProductDetail.css'
import UploadIcon from '../assets/icons/UploadIcon.svg';
import UserIcon from '../assets/icons/UserIcon.svg';
// import jojo from '.../'
import Bid from '../components/Bid'
import { useGlobal } from '../contexts/UserContextProvider';
import Carousel from 'react-elastic-carousel'

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, productById, highestBidder} = useProductContextProvider();
  const productId = id;
  const [imgFile, setImgFile] = useState('https://i.kym-cdn.com/photos/images/newsfeed/001/488/696/0e7.jpg');
  const [bidIncrease, setBidIncrease] = useState('')
  const { userId, whoAmI } = useGlobal();
  // console.log(props, "props in productDetail")
  // console.log(productId)

  // console.log(productById, "product by id in productDetail")
  const [product, setProduct] = useState([]);
  /* let toggle = false; */
  const [toggle, setToggle] = useState(false);

  const getProduct = async () => {
    await getProductById(id);
    setProduct(productById)
  }

  function expand() {
    setToggle(!toggle)
    console.log(toggle);
  }

  function truncate(date) {
    return date.substring(0, 10);
  }

  useEffect(() => {
    whoAmI();
    // console.log(userId, "userId")
    getProduct();
  }, [userId])


  return (
  

  
    <div>

<div className="emptyDiv"></div>

    {productById && <div className="container">
      
      <Carousel>
   {productById.imageUrl && 
   
   productById.imageUrl.split(",").map(( image, i ) => 

      <img src={image} className="singleimg" />
   )}
   </Carousel>
     
      <div className="infowrap">
        <p className="category-location" >{productById.categoryId.name} • {productById.locationId.name}</p>
        <p className="product-title" >{productById.title}</p>
        <p className="product-brand" >{productById.brand}</p>
        <p className="description-price" >Starting price</p>
        <p className="product-price" >{productById.startingPrice}</p>
        <p className="description-condition" >Condition</p>
        <p className="product-condition" >{productById.condition}</p>
        <p className="description-details" >Details</p>
        <p className="product-details" >{productById.details}</p>
        <p className="description-endDate" >Ends</p>
          <p className="product-endDate" >End date: {productById.endDate}</p>
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
              {productById.expired && <div className="bidbtn-wrap">
                <button className="placebid">
                  <img src={UploadIcon} />
                  <p className="bidbtn-text">Product has expired</p>
                </button>
              </div>}
              {!productById.owner && !productById.expired && 
                <input
                  type="number"
                  placeholder="Bid value to increase with. If empty bid is increased with 10%"
                  required="required"
                  onChange={e => setBidIncrease(e.target.value)} />}
              {!productById.owner && !productById.expired &&
                <Bid product={productId} startingPrice={productById.startingPrice} bidIncrease={bidIncrease} maxBid={0} />}
              {productById.owner && !productById.expired && <div className="bidbtn-wrap">
                <button className="placebid">
                  <img src={UploadIcon} />
                  <p className="bidbtn-text">You can not bid on your product</p>
                </button>
              </div>}
            </div>
          </div>
        }
        {productById.bids.length > 0 && highestBidder &&
          <div className="bidswrap">
            <div className="wrap">
              <p className="product-bidding">{productById.bids.length} bids</p>
              <p className="morebids" onClick={expand}>{toggle ? 'Close' : 'Show more'}</p>
            </div>
            <p className="highestbid-title">Highest bid</p>
            <div className="highestbidder">
              <img src={UserIcon} className="avatar"/>
              <p className="highestbidder-user">{highestBidder.bidderId.username}</p>
              <p className="highestbid-price">{highestBidder.price}</p>
              <p className="bidDate">{truncate(highestBidder.bidderTime)}</p>
            </div>
            {toggle && <div className="allbids">
              <p className="allbids-title">All bids</p>
              {productById.bids.map(bid =>
                  <div className="bidwrap">
                    <img src={UserIcon} className="bid-usericon"/>
                    <p className="bidtext">{bid.bidderId.username}</p>
                    <p className="bidtext">{bid.price}</p>
                    <p className="bidtext">{truncate(bid.bidderTime)}</p>
                  </div>
              )}
            </div>}
            {productById.expired && <div className="bidbtn-wrap">
              <button className="placebid">
                <img src={UploadIcon} />
                <p className="bidbtn-text">Product has expired</p>
              </button>
            </div>}
            {/* productById.highestBidder && */}

            {!productById.owner && !productById.expired && !productById.isUserHighestBidder &&
            <input
              type="number"
              placeholder="Bid value to increase with. If empty bid is increased with 10%"
              required="required"
                onChange={e => setBidIncrease(e.target.value)} />}
            {!productById.owner && !productById.expired && !productById.isUserHighestBidder &&
              <Bid product={productId} startingPrice={productById.startingPrice} bidIncrease={bidIncrease} maxBid={highestBidder.price} />}
            {productById.owner && !productById.expired && <div className="bidbtn-wrap">
              <button className="placebid">
                <img src={UploadIcon} />
                <p className="bidbtn-text">You can not bid on your product</p>
              </button>
            </div>}
            {!productById.owner && !productById.expired && productById.isUserHighestBidder && <div className="bidbtn-wrap">
              <button className="placebid">
                <img src={UploadIcon} />
                <p className="bidbtn-text">You are already highest bidder</p>
              </button>
            </div>}
          </div>
        }
        <hr className="hr-break"/>
        <p className="seller-title">Seller</p>
        <div className="sellercontainer">
          <img src={UserIcon} className="seller-icon"/>
          <p className="seller">{productById.productOwnerId.username}</p>
        </div>
        </div>
        
        {/* {!product.owner && <Bid product={product.id} startingPrice={product.startingPrice} bidIncrease={bidIncrease} maxBid={ product.maxBid }/>} */}
        {/* <Bid product={product.id} startingPrice={product.startingPrice} bidIncrease={bidIncrease} maxBid={product.highestBid} /> */}
    </div>}
    </div>
   );
}
 
export default ProductDetail;
