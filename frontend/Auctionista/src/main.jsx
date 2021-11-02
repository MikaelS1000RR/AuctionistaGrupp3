import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ProductContext from './contexts/ProductContextProvider'
import LocationContext from './contexts/LocationContextProvider'
import CategoryContext from './contexts/CategoryContextProvider'
import LocalStorageContext from './contexts/LocalStorageContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <LocalStorageContext>
      <ProductContext>
        <LocationContext>
          <CategoryContext>
            <App />
          </CategoryContext>
        </LocationContext>
      </ProductContext>
    </LocalStorageContext>
  </React.StrictMode>,
  document.getElementById('root')
)
