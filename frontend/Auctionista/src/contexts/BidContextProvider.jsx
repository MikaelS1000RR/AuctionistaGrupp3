import { createContext, useState, useContext, useEffect } from 'react'

export const BidContext = createContext();
export const useGlobalCategory = () => useContext(BidContext);

const BidContextProvider = (props) => {

  const values = {

  }

  return (
    <BidContext.Provider value={values}>
      {props.children}
    </BidContext.Provider>
   );
}
 
export default BidContextProvider;