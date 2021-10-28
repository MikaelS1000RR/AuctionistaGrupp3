import React, { useContext, useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom'
import Select, { createFilter } from 'react-select';
//import {ProductContext} from '../contexts/ProductContextProvider'

export default function SearchBar(props){
    //const { productsBySearch } = useContext(ProductContext)
    const [options, setOptions] = useState([])
    const [product, setProduct] = useState("")
    const location = useLocation();
    const [selectedOption,setSelectedOption] = useState(location.pathname === '/' ? null:JSON.parse(localStorage.getItem('selectedOption')))

   /*  async function setAllOptions(){
        let optionCities = []
        productsBySearch.map( c => {
            optionCities.push({value:c.id})
        })
        setOptions([...optionCities])
    }

    useEffect(()=>{
        setAllOptions()
    }, [productsBySearch]) */

    const changeCity = async (val,e) => {
        props.getData(val)
        setSelectedOption()
    }

    const changeCategory = async (val, e) => {
        props.getData(val)
        setSelectedOption()
    }

    const filterConfig = {
        ignoreCase: true,
        ignoreAccents:true,
        trim:true,
        matchFrom:'start'
    }

    return (
        <div>
            <div className="inputwrap">
                <input
                    name="product"
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    key="1">
                </input>
            </div>
            <Select 
              defaultValue={''}
              onChange={changeCity}
              options={options}
              filterOption={createFilter(filterConfig)}
            />
            <Select
                defaultValue={''}
                onChange={changeCategory}
                options={options}
                filterOption={createFilter(filterConfig)}
            />
        </div>
    )
}