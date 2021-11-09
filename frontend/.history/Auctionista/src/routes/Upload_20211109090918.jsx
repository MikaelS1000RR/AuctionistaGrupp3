import '../css/Uploadview.css';
import UploadIcon from '../assets/icons/UploadIcon.svg'
import FileUpload from '../components/FileUpload';
import { useProductContextProvider } from '../contexts/ProductContextProvider'
import React, { useState, useContext, useEffect } from 'react'
import { useGlobal } from '../contexts/UserContextProvider'
import { useHistory } from 'react-router'
import swal from 'sweetalert';
import Select, { createFilter } from 'react-select';
import { useGlobalLocation } from '../contexts/LocationContextProvider'
import { useGlobalCategory } from '../contexts/CategoryContextProvider'
import { useSearchParm } from '../contexts/SearchParmContextProvider'
import { useImageContext } from '../contexts/ImageContextProvider';

const Upload = () => {
  const { image } = useImageContext()
  const { products, getProducts, uploadProduct, uploadPhotos } = useProductContextProvider();
  const { userId, userName, email, setUserName, whoAmI, isLoggedIn, setIsLoggedIn, user } = useGlobal();
  const { locations } = useGlobalLocation()
  const { categories } = useGlobalCategory()
  const [locationOptions, setLocationOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [details, setDetails] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [condition, setCondition] = useState('');
  const [locationId, setLocationId] = useState('');
  const [description, setDescription] = useState('');
  let history = useHistory();
  const { saveSelectedLocation, saveSelectedCategory } = useSearchParm()
  const [selectedLocation, setSelectedLocation] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  
  const theProduct = async (e) => {
    e.preventDefault()
    
    const credentials = {
      title,
      brand,
      details,
      categoryId,
      startingPrice,
      endDate,
      condition,
      locationId,
      description,
      uploadDate: new Date().toISOString().slice(0, 10),
      productOwnerId: user,
      
    }
    
    
     
     
     const respons = await uploadProduct(credentials)
     // If products posted successfully
     if (respons == '200') {
       
       
       swal("Success", "Your product has been uploaded!", "success");
       setTimeout(() => {
         
         history.push("/")  // push to product page
      }, 2000);
    } 
    // If something went wrong
    else {
      swal("Error", "Something went wrong. Your product couldn't be uploaded ", "error");
    }
    
  }

  const minDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
  const changeLocation = async (val, e) => {
    const location2 = {
      id: val.value,
    }
    setLocationId(location2)
  }

  const changeCategory = async (val, e) => {
    const category2 = {
      id: val.value,
    }
    setCategoryId(category2)
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


  useEffect(() => {
    setAllOptions()
  }, [locations, categories])


  const newSubmit = (e) => {}

  const newSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)

    
    let res = await fetch('/api/products/newSubmit', {
      method: 'POST',
      body: formData
    })

  }

 
  return (
    <div className="uploadview">
      <p className="backroute">Back</p>
      <h1 className="uploadtitle">Upload</h1>

      <form onSubmit={newSubmit}>
        <div className="inputwrap">
          <input
            type="text"
            placeholder="Title"
            required="required"
            value={title}
            onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Brand"
            required="required"
            value={brand}
            onChange={e => setBrand(e.target.value)} />
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Details (single or commaseparated list)"
            required="required"
            value={details}
            onChange={e => setDetails(e.target.value)} />
        </div>

        <div className="inputwrap">
          <Select
            placeholder="Category"
            required="required"
            options={categoryOptions}
            onChange={changeCategory} />
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Starting price"
            required="required"
            value={startingPrice}
            onChange={e => setStartingPrice(e.target.value)} />
        </div>

        <div className="inputwrap">
          <input
                 type="text"
                 onFocus={
                  (e)=> {
                    e.currentTarget.type = "date";
                    e.currentTarget.focus();
                   }
                 }
                 placeholder="End Date"

            min={minDate()}
        
            required="required"
            value={endDate}
            onChange={e => setEndDate(e.target.value)} 
            />
        </div>

        <div className="inputwrap">
          <input
            type="text"
            placeholder="Condition"
            required="required"
            value={condition}
            onChange={e => setCondition(e.target.value)} />
        </div>

        <div className="inputwrap">
          <Select
            placeholder="Location"
            required="required"
            options={locationOptions}
            onChange={changeLocation} />
        </div>

        <div className="inputwrap">
          <textarea name="" id="" cols="30" rows="5" placeholder="Description"
            required="required"
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        <FileUpload  />

        <hr className="break" />
        <div className="uploadbtn-wrap">
          <button className="uploadbtn"><img src={UploadIcon} className="uploadicon" /> Upload</button>
        </div>
      </form>
    </div>
  );
}

export default Upload; 