import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { LoggedIn } from '../App'
import { UserContext } from '../contexts/UserContextProvider'
const Products = () => {
  const { userName, email } = useContext(UserContext);

  return (
    <div>
      Products
      <h1>{userName}</h1>
      <h1>{email}</h1>
    </div>
   );
}
 
export default Products;