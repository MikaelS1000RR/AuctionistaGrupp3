import '../css/Uploadview.css';
import UploadIcon from '../assets/icons/UploadIcon.svg'
import FileUpload from '../components/FileUpload';
import { useProductContextProvider } from '../contexts/ProductContextProvider'
import React, { useState, useContext } from 'react'
import { useGlobal } from '../contexts/UserContextProvider'

const Upload = () => {
  const { products, getProducts, uploadProduct } = useProductContextProvider();
  const { userId, userName, email, setUserName, whoAmI, isLoggedIn, setIsLoggedIn, user } = useGlobal();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [productOwnerId, setProductOwnerId] = useState('');

  const theProduct = async (e) => {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)
    console.log(user, "user")
    console.log(today, "today")
    setUploadDate(today)
    setProductOwnerId(user)


    // did it work? 
    // let result = null;
    // try {
    //   result = JSON.parse(JSONstring);
    // } catch(e) {

    // }
    
    const credentials = {
      title,
      brand,
      details,
      category,
      startingPrice,
      endDate,
      condition,
      location,
      description,
      uploadDate,
      productOwnerId
    }
    await uploadProduct(credentials)
  }

  const minDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
  return (
    <div className="uploadview">
      <p className="backroute">Back</p>
      <h1 className="uploadtitle">Upload</h1>
      
      <form onSubmit={theProduct}>
        <div className="inputwrap">
          <input
            type="text"
            placeholder="Title"
            required="required"
            value={title}
            onChange={e => setTitle(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Brand"
            required="required"
            value={brand}
            onChange={e => setBrand(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Details (single or commaseparated list)"
            required="required"
            value={details}
            onChange={e => setDetails(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Category"
            required="required"
            value={category}
            onChange={e => setCategory(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Starting price"
            required="required"
            value={startingPrice}
            onChange={e => setStartingPrice(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="date"
            min={minDate()}
            placeholder="End date"
            required="required"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Condition"
            required="required"
            value={condition}
            onChange={e => setCondition(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Location"
            required="required"
            value={location}
            onChange={e => setLocation(e.target.value)}/>
        </div>

        <div className="inputwrap">
          <textarea name="" id="" cols="30" rows="5" placeholder="Description"
            required="required"
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
        </div>
  
        <FileUpload/>
        
      <hr className="break"/>
      <div className="uploadbtn-wrap">
        <button className="uploadbtn"><img src={UploadIcon} className="uploadicon"/> Upload</button>
      </div>
      </form>
    </div>
   );
}
 
export default Upload;