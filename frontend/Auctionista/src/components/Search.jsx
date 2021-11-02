import SearchBar from './SearchBar'
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParm } from '../contexts/SearchParmContextProvider'

const SearchComponent = () => {
    
    const { saveSelectedLocation, saveSelectedCategory} = useSearchParm()

    const handleLocationData = (ev) => {
        localStorage.setItem('selectedLocation', ev.value)
        saveSelectedLocation(ev.value)
    }

    const handleCategoryData = (ev) => {
        /*let data = JSON.stringify(ev)
        let selectedCategory = JSON.parse(data).value */
        localStorage.setItem('selectedCategory', ev.value)
        saveSelectedCategory(ev.value)
    }


    return (
        <div>
            <SearchBar getLocationData={handleLocationData} getCategoryData={handleCategoryData} />
            <br /> <br />
        </div>
    )
}

export default SearchComponent