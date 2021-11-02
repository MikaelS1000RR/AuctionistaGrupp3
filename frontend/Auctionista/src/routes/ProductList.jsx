import Search from '../components/Search'
import ProductResults from '../components/productResults';
import { Button } from 'reactstrap';
import { useState } from 'react'

const ProductList = () => {
    localStorage.removeItem('selectedCategory', 0)
    localStorage.removeItem('inputedProduct', '')
    localStorage.removeItem('selectedLocation', 0)
    const [isSearch,setIsSearch] = useState(false)

    return(
        <div className = "productList">
            <Search />
            <button key="1" onClick={() => { setIsSearch(true),console.log('click on search')}}>Search</button>
            {isSearch ? <ProductResults />: ''}
        </div>
    )

}

export default ProductList;