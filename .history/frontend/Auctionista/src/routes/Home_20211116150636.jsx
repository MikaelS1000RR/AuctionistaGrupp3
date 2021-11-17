import { useContext, useState, useEffect } from 'react';
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
import UploadIcon from '../assets/icons/UploadIcon.svg';
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
import { useProductContextProvider } from '../contexts/ProductContextProvider'

import { useSearchParm } from '../contexts/SearchParmContextProvider'
import { useBidContext } from '../contexts/BidContextProvider';


const Home = () => {
  const { getProductById, productById } = useProductContextProvider();
  const { bidTitle, bidLocation, bidCategory, setBidTitle, setBidLocation, setBidCategory } = useBidContext();
  const { isLoggedIn } = useGlobal();
  const { products, getProducts, setProductsBySearch, highestBidder, notFound } = useContext(ProductContext);
  const { fetchProductBySearch } = useContext(ProductContext);
  const { productsBySearch } = useContext(ProductContext);
  const [search, setSearch] = useState('');
  const [location, setLocationId] = useState(0);
  const [category, setCategoryId] = useState(0);
  const { locations } = useGlobalLocation()
  const { categories } = useGlobalCategory()
  const [locationOptions, setLocationOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [bidIncrease, setBidIncrease] = useState('')
  const [checked, setChecked] = useState(true);
  const toggleChecked = () => setChecked(value => !value);

  const { saveSelectedLocation, saveSelectedCategory, saveInputedProduct } = useSearchParm()

  let history = useHistory();

  let onSell = 0
  if (checked) {
    onSell = 1
  }

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
    if (!isLoggedIn) {
      history.push('/login');
    }

    let obj = {
      title: search,
      location: location,
      category: category,
      onSell: onSell
    }
    setBidTitle(search)
    setBidLocation(location)
    setBidCategory(category)


    fetchProductBySearch(obj);

    saveSelectedLocation(location)
    saveSelectedCategory(category)
    saveInputedProduct(search)

  }

  const changeLocation = async (val, e) => {
    setLocationId(val.value);
  }

  const changeCategory = async (val, e) => {
    setCategoryId(val.value);
  }

  const updateFirstTime = () => {          

    let obj = {
      title: '',
      location: 0,
      category: 0,
      onSell: onSell
    }
    fetchProductBySearch(obj)
  }


  useEffect(() => {
    getProducts()
    setAllOptions()
    updateFirstTime()
  }, [locations, categories])

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'start'
  }


  function listByCategory(id) {
    let obj = {
      title: search,
      location: location,
      category: id,
      onSell: onSell
    }
    fetchProductBySearch(obj);
  }

  function clear() {
    setProductsBySearch([]);
  }

  return (

    <div className="home">
      <div className="logowrap">
        <div className="logo">
          <img src={SearchiconLogo} />
          <img src={MoneyiconLogo} />
          <img src={PackageiconLogo} />
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
        {!isLoggedIn && <button className="register"><Link to="/register" className="link"><img src={UploadIcon} /> Join now</Link></button>}
      </div>
      <hr className="break" />
      <p className="searchdescription">Search products, categories or location</p>
      <div className="searchwrap">
        <div className="inputwrap">
          <img src={Searchicon} />
          <input type="text" placeholder="Search" onChange={event => setSearch(event.target.value)} />
        </div>
        <Select
          defaultValue={''}
          onChange={changeLocation}
          options={locationOptions}
          key="2"
          placeholder="Location"
          className="selectLocation"
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Name"}
        />
       
    
       {/* <label key="1"> Category 
       </label> */}


       <label className="category-label" >
         Choose Category
       </label>
        
        <Select 
          defaultValue={''}
          onChange={changeCategory}
          options={categoryOptions}
          filterOption={createFilter(filterConfig)}
          key="3"
        
          className="SelectCategory"
          />

        <div className="search">
          <button className="searchbtn" onClick={listProducts}>Search</button>
        </div>
      </div>
      <hr className="break" />
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
      />
      <div className="search">Also show expired products</div>

      <p className="categories">Categories</p>
      <div className="categorywrap">
        <div className="categoryrow">
          <img src={Vehicleicon} onClick={() => listByCategory(4)} />
          <img src={Bicycleicon} onClick={() => listByCategory(1)} />
          <img src={Techicon} onClick={() => listByCategory(2)} />
          <img src={Clothingicon} onClick={() => listByCategory(3)} />
        </div>
        <div className="categoryrow">
          <img src={Kitchenicon} onClick={() => listByCategory(5)} />
          <img src={Homeicon} onClick={() => listByCategory(6)} />
          <img src={Toolsicon} onClick={() => listByCategory(7)} />
          <img src={Litteratureicon} onClick={() => listByCategory(8)} />
        </div>
      </div>
      {isLoggedIn && <div>
        <hr className="break" />
        <div className="upperproducts">
          <p className="products">Products</p>
          {productsBySearch.length > 0 && <p className="more" onClick={clear}>Clear</p>}
        </div>
        {notFound && <p className="notFound">{notFound}</p>}
        {productsBySearch && <div className="productswrap">
          {productsBySearch.map(product =>
            <div className="productwrap" key={product.id}>
              {(checked || !product.expired) && <Link to={`/productDetail/${product.id}`} className="productroute">
                <div className="productimg">
                  <img className="productImage" src={
                    product.imageUrl &&
                    product.imageUrl.split(",")[0]} />
                </div>
                <div className="productinfo">
                  <div className="flex-row">
                    <p className="title">{product.title}</p>
                    <p className="bids">{product.bids.length} bids</p>
                  </div>
                  <p className="price">Starting price: {product.startingPrice}</p>
                  <p className="price">Highest bid: {product.highestBid}</p>
                  <div className="flex-row">
                    <p className="endtime">End date: {product.endDate}</p>
                  </div>
                </div>
              </Link>}
              {checked && product.expired && <div className="bidbtn-wrap">
                <button className="placebid">
                  <img src={UploadIcon} />
                  <p className="bidbtn-text">Product has expired</p>
                </button>
              </div>}
              {!product.owner && !product.expired && !product.isUserHighestBidder && <input
                type="number"
                placeholder="Bid value to increase with. If empty bid is increased with 10%"
                required="required"
                onChange={e => setBidIncrease(e.target.value)} />}
              {!product.owner && !product.expired && !product.isUserHighestBidder && <Bid product={product.id} startingPrice={product.startingPrice} bidIncrease={bidIncrease} maxBid={product.highestBid} />}
              {product.owner && !product.expired && <div className="bidbtn-wrap">
                <button className="placebid">
                  <img src={UploadIcon} />
                  <p className="bidbtn-text">You can not bid on your product</p>
                </button>
              </div>}
              {!product.owner && !product.expired && product.isUserHighestBidder && <div className="bidbtn-wrap">
                <button className="placebid">
                  <img src={UploadIcon} />
                  <p className="bidbtn-text">You are already highest bidder</p>
                </button>
              </div>}

            </div>)}

        </div>}
      </div>}
    </div>
  );
}

export default Home;