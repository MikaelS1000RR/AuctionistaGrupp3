import SearchBar from './SearchBar'

const SearchComponent = () => {
    
    const handleData = (ev) =>{
        localStorege.setItem('selectedOption',JSON.stringify(ev))
        localStorege.setItem('selectedCity', JSON.stringify(ev))
        localStorege.setItem('selectedProduct', JSON.stringify(ev))
    }

    return (
        <div>
            <SearchBar getData = {handleData} />
            <br /> <br />
        </div>
    )
}

export default SearchComponent