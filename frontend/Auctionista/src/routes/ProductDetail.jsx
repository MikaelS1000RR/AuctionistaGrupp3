import React, { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router";
import { useProductContextProvider } from '../contexts/ProductContextProvider'


const ProductDetail = (props) => {
  const { id } = useParams();
  const { getProductById } = useProductContextProvider();
  const productId = id;
  console.log(props)
  console.log(productId)
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const response = await getProductById(id);
    setProduct(response);
    console.log(response, "THIS IS response")
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      ProductDetail
      <div>
        <div>{product.id }</div>
        <div>{product.brand }</div>
        <div>{product.title }</div>
        <div>{product.description }</div>
        <div>{product.startingPrice }</div>
        <div>{product.condition }</div>
        <div>{product.details }</div>
        <div>{product.endDate }</div>
        <div>{product.locationId }</div>
        <div>{product.productOwnerId }</div>
        <div>{product.startingPrice }</div>
        <div>{product.uploadDate }</div>
      </div>
     
    </div>
   );
}
 
export default ProductDetail;