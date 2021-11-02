import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ProductContext from './contexts/ProductContextProvider'
import LocationContext from './contexts/LocationContextProvider'
import CategoryContext from './contexts/CategoryContextProvider'
import SearchParmContext from './contexts/SearchParmContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <ProductContext>
      <LocationContext>
        <CategoryContext>
          <SearchParmContext>
            <App />
          </SearchParmContext>
        </CategoryContext>
      </LocationContext>
    </ProductContext>
  </React.StrictMode>,
  document.getElementById('root')
)
