import {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/UserContextProvider';
import { ProductContext } from '../contexts/ProductContextProvider'
import { useHistory } from 'react-router'
import Select, { createFilter } from 'react-select';
import { useGlobalLocation } from '../contexts/LocationContextProvider'
import { useGlobalCategory } from '../contexts/CategoryContextProvider'
import Bid from '../components/Bid'
import ProductList from './ProductList'
import SearchiconLogo from '../assets/icons/SearchiconLogo.svg';
import MoneyiconLogo from '../assets/icons/MoneyiconLogo.svg';
import PackageiconLogo from '../assets/icons/PackageiconLogo.svg';
import Uploadicon from '../assets/icons/UploadIcon.svg';
import Searchicon from '../assets/icons/Searchicon.svg';
import Locationicon from '../assets/icons/Locationicon.svg';
import '../css/Home.css';
import Vehicleicon from '../assets/categoryicons/Vehicleicon.svg';
import Bicycleicon from '../assets/categoryicons/Bicycleicon.svg';
import Techicon from '../assets/categoryicons/Techicon.svg';
import Clothingicon from '../assets/categoryicons/Clothingicon.svg';
import Kitchenicon from '../assets/categoryicons/Kitchenicon.svg';
import Toolsicon from '../assets/categoryicons/Toolsicon.svg';
import Litteratureicon from '../assets/categoryicons/Litteratureicon.svg';
import Homeicon from '../assets/categoryicons/Homeicon.svg';
import { Container, Row, Col, Button } from "reactstrap";

import { useSearchParm } from '../contexts/SearchParmContextProvider'
import { useBidContext } from '../contexts/BidContextProvider';


const Home = () => {
  const { bids, setBids, getBidById, getBidByProductId, bidsByProductId, setBidsByProductId } = useBidContext();
  const {isLoggedIn} = useGlobal();
  const { products, getProducts} = useContext(ProductContext);
  const {fetchProductBySearch} = useContext(ProductContext);
  const {productsBySearch} = useContext(ProductContext); 
  const [search, setSearch] = useState('');
  const [location, setLocationId] = useState(0);
  const [category, setCategoryId] = useState(0);
  const { locations } = useGlobalLocation()
  const { categories } = useGlobalCategory()
  const [locationOptions, setLocationOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [bidIncrease, setBidIncrease] = useState('')
  const { saveSelectedLocation, saveSelectedCategory,saveInputedProduct} = useSearchParm()

  let history = useHistory();

  async function setAllOptions() {
    let locationOptions = []
    locations.map(c => {
        locationOptions.push({ value: c.id, label: c.name })
    })
    setLocationOptions([...locationOptions])

    let categoryOptions = []
    categories.map(c => {
        categoryOptions.push({ value: c.id, label: c.name })
    })
    setCategoryOptions([...categoryOptions])
  }
  
  function listProducts() {
    let obj = {
      title: search,
      location: location,
      category: category
    }
    fetchProductBySearch(obj);
    console.log(productsBySearch);

    saveSelectedLocation(location)
    saveSelectedCategory(category)
    saveInputedProduct(search)

    history.push('/products');
  }

  const changeLocation = async (val, e) => {
    /* props.getLocationData(val)
    setSelectedLocation(val.value) */
    console.log("locationid: ", val.value);
    setLocationId(val.value);
  }

  const changeCategory = async (val, e) => {
    /* props.getCategoryData(val)
    setSelectedCategory(val.value) */
    console.log("categoryid: ", val.value);
    setCategoryId(val.value);
  }

  useEffect(() => {
    getProducts(),
    setAllOptions()
  }, [locations, categories])

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'start'
  }
  const test = async () => {
    // getBidById(23)
    await getBidByProductId(19)
    console.log(bidsByProductId, "bidsByProductId")
  }

  return (
    
    <div className="home">
      <div className="logowrap">
        <div className="logo">
          <img src={SearchiconLogo}/>
          <img src={MoneyiconLogo}/>
          <img src={PackageiconLogo}/>
        </div>
      </div>
      <div className="informationwrap">
        <h3 className="subtitle">Online auction - made easy</h3>
        {!isLoggedIn && <p className="information">
          Place your items on auction for others to bid on and possibly buy.
          You set starting price and duration of item on sale. 
          Keep easy track of your auctions and biddings and search and filter
          through a variety of categories and products all ready to be bought.
        </p>}
        {!isLoggedIn && <button className="register"><Link to="/register" className="link"><img src={Uploadicon}/> Join now</Link></button>}
      </div>
      <hr className="break"/>
      <p className="searchdescription">Search products, categories or location</p>
      <div className="searchwrap">
        <div className="inputwrap">
          <img src={Searchicon}/>
          <input type="text" placeholder="Search" onChange={event => setSearch(event.target.value)}/>
        </div>
        <Select
                defaultValue={''}
                /* onChange={changeLocation} */
                onChange={changeLocation}
                options={locationOptions}
                key="2"
                placeholder="Location"
        />
        <Select
                defaultValue={''}
                onChange={changeCategory}
                options={categoryOptions}
                filterOption={createFilter(filterConfig)}
                key="3"
                placeholder="Category"
                className="SelectCategory"
        />
        <div className="search">
          <button className="searchbtn" onClick={listProducts}>Search</button>
        </div>
      </div>
      <hr className="break"/>
      <p className="categories">Categories</p>
      <div className="categorywrap">
        <div className="categoryrow">
          <img src={Vehicleicon}/>
          <img src={Bicycleicon}/>
          <img src={Techicon}/>
          <img src={Clothingicon}/>
        </div>
        <div className="categoryrow">
          <img src={Kitchenicon}/>
          <img src={Homeicon}/>
          <img src={Toolsicon}/>
          <img src={Litteratureicon}/>
        </div>
      </div>
      {isLoggedIn && <div>
      <hr className="break"/>
      <div className="upperproducts">
        <p className="products">Products</p>
        <p className="more">More</p>
      </div>
      <div className="productswrap">
        {products.map(product => 
          <div className="productwrap" key={product.id}>
            <Link to={`/productDetail/${product.id}`}>
            <div className="productimg"><p className="img">img</p></div>
            <div className="productinfo">
              <p className="title">{product.title}</p>
              <p className="price">Starting price: {product.startingPrice}</p>
              <p className="price">Highest bid: {product.startingPrice}</p>
              <p className="bids">{product.bids.length} bids</p>
              <p className="endtime">{product.endDate}</p>
            </div>
            </Link>
            <input
              type="text"
              placeholder="Bid value. If empty bid is increased with 10%"
              required="required"
              onChange={e => setBidIncrease(e.target.value)} />
            <Bid product={product.id} startingPrice={product.startingPrice} bidIncrease={bidIncrease}/>
          </div>)}
      </div>
      </div>}
      {/* {productsBySearch ? <ProductList/> : ''} */}
      <Button onClick={test}>TestButton</Button>
    </div>
   );
}
 
export default Home;