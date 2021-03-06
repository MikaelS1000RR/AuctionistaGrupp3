import '../css/Uploadview.css';
import UploadIcon from '../assets/icons/UploadIcon.svg'
import FileUpload from '../components/FileUpload';
import React, { useState, useEffect } from 'react'
import { useGlobal } from '../contexts/UserContextProvider'
import { useHistory } from 'react-router'
import swal from 'sweetalert';
import Select, { createFilter } from 'react-select';
import { useGlobalLocation } from '../contexts/LocationContextProvider'
import { useGlobalCategory } from '../contexts/CategoryContextProvider'
import { useImageContext } from '../contexts/ImageContextProvider';
import { nanoid } from 'nanoid';

export default function Upload(){
  const { images} = useImageContext()
  const {  user } = useGlobal();
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
  let dateInput = new Date(endDate);
  let dateConverter = dateInput.getTime();
  
  const minDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }

  const maxDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 2).padStart(2, "0"); //January is 0!
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

  const newSubmit = async (e) => {
    e.preventDefault() 
    const formData = new FormData()
    let uploadDate = new Date().toISOString().slice(0, 10)    
    for(let image of images) {
      let file = dataURItoBlob(image)
      let fileName = nanoid() + ".jpeg"
      formData.append('files', file, fileName)
    }

    formData.append("product", JSON.stringify({
      title: title,
      brand: brand,
      details: details,
      categoryId: categoryId,
      startingPrice: startingPrice,
      endDate: dateConverter,
      condition: condition,
      locationId: locationId,
      description: description,
      uploadDate: uploadDate,
      productOwnerId: user
    }))

    
    let respons = await fetch('/api/products/createProduct', {
      method: 'POST',
      body: formData
    })
    // If products posted successfully
    if (respons.status == 200) {
      swal("Success", "Your product has been uploaded!", "success");
      
        history.push("/") 
      
    }
    // If something went wrong
    else {
      swal("Error", "Something went wrong. Your product couldn't be uploaded ", "error");
    }    
    function dataURItoBlob(dataURI) {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      let blob = new Blob([ab], { type: mimeString });
      return blob;
    }

  }
  return (
    <div className="uploadview">
      <p className="backroute">Back</p>
      <h1 className="uploadtitle">Upload</h1>

      <form onSubmit={newSubmit}>
        <div className="inputwrap">
          <input
            type="text"
            maxlength="10">
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
            max={maxDate()}
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

