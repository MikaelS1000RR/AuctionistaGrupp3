import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserContext from './contexts/UserContextProvider'
import ProductContext from './contexts/ProductContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <ProductContext>
        <App />
      </ProductContext>
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
)
