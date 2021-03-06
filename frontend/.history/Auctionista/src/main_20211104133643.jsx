import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ProductContext from './contexts/ProductContextProvider'
import LocationContext from './contexts/LocationContextProvider'
import CategoryContext from './contexts/CategoryContextProvider'
import SearchParmContext from './contexts/SearchParmContextProvider'
import UserContext from './contexts/UserContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <ProductContext>
        <LocationContext>
          <CategoryContext>
            <SearchParmContext>
              <App />
            </SearchParmContext>
          </CategoryContext>
        </LocationContext>
        </ProductContext>
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
)
