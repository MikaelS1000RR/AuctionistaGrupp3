import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/UserContextProvider';
import { ProductContext } from '../contexts/ProductContextProvider'

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


const Home = () => {
  const {isLoggedIn} = useGlobal();
  const {products} = useContext(ProductContext);
  const [search, setSearch] = useState('');
  
  function test() {
    console.log(search);
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
        <div className="inputwrap">
          <img src={Locationicon}/>
          <input type="text" placeholder="Location"/>
        </div>
        <div className="search">
          <button className="searchbtn" onClick={test}>Search</button>
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
              <p className="price">{product.startingPrice}</p>
              <p className="bids">{product.bids.length} bids</p>
              <p className="endtime">{product.endDate}</p>
            </div>
            </Link>
          </div>)}
      </div>
      </div>}
    </div>
   );
}
 
export default Home;