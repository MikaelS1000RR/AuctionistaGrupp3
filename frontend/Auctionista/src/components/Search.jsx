import SearchBar from './SearchBar'
import React, { useState, useEffect } from 'react';

const SearchComponent = () => {
    const handleLocationData = (ev) => {
        localStorage.setItem('selectedLocation', ev.value) 
    }

    const handleCategoryData = (ev) => {
        /*let data = JSON.stringify(ev)
        let selectedCategory = JSON.parse(data).value */
        localStorage.setItem('selectedCategory', ev.value)
    }
    

    return (
        <div>
            <SearchBar getLocationData={handleLocationData} getCategoryData={handleCategoryData} />
            <br /> <br />
        </div>
    )
}

export default SearchComponent