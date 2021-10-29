import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserContext from './contexts/UserContextProvider'
import ProductContextProvider from './contexts/ProductContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <ProductContextProvider>
      <UserContext>
        <App />
      </UserContext>
    </ProductContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
