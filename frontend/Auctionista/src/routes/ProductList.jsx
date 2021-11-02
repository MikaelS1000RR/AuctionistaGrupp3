import SearchBar from '../components/SearchBar'
import ProductResults from '../components/productResults';

const ProductList = () => {

    /* localStorage.removeItem('selectedCategory', null)
    localStorage.removeItem('inputedProduct', null)
    localStorage.removeItem('selectedLocation', null)
 */
    return(
        <div className = "productList">
            <SearchBar />
            <ProductResults />
        </div>
    )

}

export default ProductList;