import React, { useState, useEffect,useRef } from 'react';
import Select, { createFilter } from 'react-select';
import { useGlobalLocation } from '../contexts/LocationContextProvider'
import { useGlobalCategory } from '../contexts/CategoryContextProvider'

export default function SearchBar(props) {

 /*    constructor(props){
        super(props)
        this.state = {
            inputValue:''
        }
    } */

    const { locations } = useGlobalLocation()
    const { categories } = useGlobalCategory()
    const [product, setProduct] = useState("")
    const [selectedLocation, setSelectedLocation] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [locationOptions, setLocationOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])

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

    
    const changeLocation = async (val, e) => {
        props.getLocationData(val)
        setSelectedLocation(val.value)
    }
    
    const changeCategory = async (val, e) => {
        props.getCategoryData(val)
        setSelectedCategory(val.value)
    }

    const changeTitle = async (event) => {
        console.log('product', event.target.value)
        this.state ({
            inputValue: event.target.value
        })
        props.getTitleData(this.state.inputValue)
    }
    


    const filterConfig = {
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: 'start'
    }

    return (
        <div>
            <div className="inputwrap">
                <input
                    name="product"
                    type="text"
                    ref="product"
                    value={product}
                    onChange={changeTitle}
                    key="1">
                </input>

            </div>
            <Select
                defaultValue={''}
                onChange={changeLocation}
                options={locationOptions}
                key="2"
            />
            <Select
                defaultValue={''}
                onChange={changeCategory}
                options={categoryOptions}
                filterOption={createFilter(filterConfig)}
                key="3"
            />
        </div>
    )
}