import Search from '../components/Search'
import ProductResults from '../components/productResults';
import { Button } from 'reactstrap';
import { useState,useEffect } from 'react'

const ProductList = () => {
    const [isSearch, setIsSearch] = useState(false)
    
    return(
        <div className = "productList">
            <Search />
            <ProductResults />
          {/*   <button key="1" onClick={() => { setIsSearch(true),console.log('click on search')}}>Search</button>
            {isSearch ? <ProductResults />: ''} */}
        </div>
    )

}

export default ProductList;