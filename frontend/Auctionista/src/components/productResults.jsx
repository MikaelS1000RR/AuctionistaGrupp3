import { ProductContext } from '../contexts/ProductContextProvider'
import { useEffect, useContext, useState } from 'react'
import DetailPage from '../routes/DetailPage'
import { useSearchParm } from '../contexts/SearchParmContextProvider'

function ProductResults() {
    const { productsBySearch, fetchProductBySearch } = useContext(ProductContext)
    const [showDetailPage, setShowDetailPage] = useState(false)
    const [productId, setProductId] = useState('')
    const { selectedLocation, selectedCategory,inputedProduct } = useSearchParm()

    useEffect(async () => {

        let objects = {
            location: selectedLocation,
            title: inputedProduct,
            category: selectedCategory
        }

        let searchCondition = { ...objects }
        //console.log('searchCondition', searchCondition)
        await fetchProductBySearch(searchCondition)

    }, [selectedLocation, selectedCategory, inputedProduct])

    const openDetailPage = (productId) => {
        setShowDetailPage(true)
        setProductId(productId)
    }

    const closeDetailPage = () => {
        setShowDetailPage(false)
    }

    const productList = p => (
        <div key={p.id} style={{
            width: 'fit-content', margin: '5px 5px 20px 5px',
            borderRadius: '10px',
            transition: 'all 200ms ease-in-out',
            ':hover': {
                boxShadow: '0px 8px 36px #222',
                WebkitTransform: "scale(1.01)",
            },
        }}>
            <div
                spacing={1}
                style={{ cursor: 'pointer' }}
                onClick={() => openDetailPage(p._id)}>
                <h5>{p.brand}</h5>
                <h5>{p.title}</h5>
                <h5>{p.startingPrice} € </h5>
            </div >
        </div >
    )

    return (
        <div>
            <div style={{ fontSize: "20px", padding: '20px', backgroundColor: '#66A395', color: 'black' }}>
                <b>{productsBySearch.length}</b> Procucts
            </div>
            {productsBySearch.map(p => productList(p))}
            {showDetailPage ? <DetailPage productId={productId} closeModal={closeDetailPage} /> : ''}
        </div>
    )
}

export default ProductResults