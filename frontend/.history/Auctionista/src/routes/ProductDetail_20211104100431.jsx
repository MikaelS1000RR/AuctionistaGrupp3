import React, { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router";
import { useProductContextProvider } from '../contexts/ProductContextProvider'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "reactstrap";
// import jojo from '.../'

const ProductDetail = (props) => {
  const { id } = useParams();
  const { getProductById } = useProductContextProvider();
  const productId = id;
  const [imgFile, setImgFile] = useState('https://i.kym-cdn.com/photos/images/newsfeed/001/488/696/0e7.jpg');

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
        <div>{product.id}</div>
        {/* <div>{product.brand }</div> */}
        {/* <div>{product.title }</div> */}
        {/* <div>{product.description }</div> */}
        {/* <div>{product.startingPrice }</div> */}
        {/* <div>{product.condition }</div> */}
        {/* <div>{product.details }</div> */}
        {/* <div>{product.endDate }</div> */}
        {/* <div>{product.locationId }</div>
        <div>{product.productOwnerId }</div>
        <div>{product.categoryId }</div> */}
        {/* <div>{product.uploadDate }</div> */}
      </div>
      <Container style={styles.container}>
        {/* <Row><Col><div className="productimg"><p className="img">img</p></div></Col></Row> */}
        <Row><Col>{product.im}</Col></Row>
        <Row><Col>Title: </Col><Col>{product.title}</Col></Row>
        <Row><Col>Brand: </Col><Col>{product.brand}</Col></Row>
        <Row><Col>Description: </Col><Col>{product.description}</Col></Row>
        <Row><Col>Staring price: </Col><Col>{product.startingPrice}</Col></Row>
        <Row><Col>Condition: </Col><Col>{product.condition}</Col></Row>
        <Row><Col>Detail: </Col><Col>{product.details}</Col></Row>
        <Row><Col>Upload date: </Col><Col>{product.uploadDate}</Col></Row>
        <Row><Col>End date: </Col><Col>{product.endDate}</Col></Row>
        <Row><Col><Button>Bid on product</Button></Col></Row>
      </Container>
    </div>
   );
}
 
export default ProductDetail;

const styles = {
  container: {
    padding: '0.25em',
    border: '3px solid rgba(97, 149, 228, 0.5)',
    borderRadius: '5px'
  },
  img: {
    width: '5rem'
  }
}