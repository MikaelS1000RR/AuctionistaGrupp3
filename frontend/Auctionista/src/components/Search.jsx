import SearchBar from './SearchBar'
import React, { useState, useEffect, useContext } from 'react';
import SearchParmContext from '../contexts/SearchParmContextProvider'

const SearchComponent = () => {
    const { saveLocation, saveCategory } = useContext(SearchParmContext)

    const handleLocationData = (ev) => {
        localStorage.setItem('selectedLocation', ev.value)
        console.log(ev.value)
       // saveLocation(ev.value)
    }

    const handleCategoryData = (ev) => {
        /*let data = JSON.stringify(ev)
        let selectedCategory = JSON.parse(data).value */
        localStorage.setItem('selectedCategory', ev.value)
        console.log(ev.value)
       // saveCategory(ev.value)
    }


    return (
        <div>
            <SearchBar getLocationData={handleLocationData} getCategoryData={handleCategoryData} />

            <br /> <br />
        </div>
    )
}

export default SearchComponent