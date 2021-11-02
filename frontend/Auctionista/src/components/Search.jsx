import SearchBar from './SearchBar'
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContextProvider'

const SearchComponent = () => {
    const { saveLocalStorage } = useContext(ProductContext)
    const handleLocationData = (ev) => {
        // localStorage.setItem('selectedLocation', ev.value) 
        let searchings = []
        console.log('ev',ev)
        searchings.push({ title: '', location: ev.value, category: 0 })
        saveLocalStorage(searchings)
    }

    const handleCategoryData = (ev) => {
        let searchings = []
        console.log('ev', ev)
        searchings.push({ title: '', location: 0, category: ev.value })
        saveLocalStorage(searchings)
    }

    const handleTitleData = (ev) => {
        let searchings = []
        console.log('ev', ev)
        searchings.push({ title: ev.value, location: 0, category: 0 })
        saveLocalStorage(searchings)
    }


    return (
        <div>
            <SearchBar getLocationData={handleLocationData} getCategoryData={handleCategoryData} getTitleData={handleTitleData} />
            <br /> <br />
        </div>
    )
}

export default SearchComponent