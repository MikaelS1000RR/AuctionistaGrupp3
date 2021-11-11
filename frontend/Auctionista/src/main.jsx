import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ProductContext from './contexts/ProductContextProvider'
import LocationContext from './contexts/LocationContextProvider'
import CategoryContext from './contexts/CategoryContextProvider'
import SearchParmContext from './contexts/SearchParmContextProvider'
import UserContext from './contexts/UserContextProvider'
import BidContext from './contexts/BidContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <ProductContext>
        <LocationContext>
          <CategoryContext>
            <SearchParmContext>
              <BidContext>
              <App />
              </BidContext>
            </SearchParmContext>
          </CategoryContext>
        </LocationContext>
        </ProductContext>
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
)
