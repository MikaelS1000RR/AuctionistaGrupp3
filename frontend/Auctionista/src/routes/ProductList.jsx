import Search from '../components/Search'
import ProductResults from '../components/productResults';

const ProductList = () => {

    /* localStorage.removeItem('selectedCategory', null)
    localStorage.removeItem('inputedProduct', null)
    localStorage.removeItem('selectedLocation', null)
 */
    return(
        <div className = "productList">
            <Search />
            <ProductResults />
        </div>
    )

}

export default ProductList;