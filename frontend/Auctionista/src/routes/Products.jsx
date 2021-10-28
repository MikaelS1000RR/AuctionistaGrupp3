import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { LoggedIn } from '../App'
import { useGlobal } from '../contexts/UserContextProvider'
const Products = () => {
  const { userId, userName, email, setUserName, whoAmI } = useGlobal();

  return (
    <div>
      Products
      <h1>{ userId }</h1>
      <h1>{userName}</h1>
      <h1>{email}</h1>
    </div>
   );
}
 
export default Products;