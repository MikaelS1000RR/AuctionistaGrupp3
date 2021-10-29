import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ProductContext from './contexts/ProductContextProvider'
import LocationContext from './contexts/LocationContextProvider'
import CategoryContext from './contexts/CategoryContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <ProductContext>
      <LocationContext>
        <CategoryContext>
          <App />
        </CategoryContext>
      </LocationContext>
    </ProductContext>
  </React.StrictMode>,
  document.getElementById('root')
)
