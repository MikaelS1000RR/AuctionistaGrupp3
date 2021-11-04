import { createContext, useState, useContext, useEffect } from 'react'

export const BidContext = createContext();
export const useBidContext = () => useContext(BidContext);

const BidContextProvider = (props) => {
  console.log('ITS HERE')
  const [bids, setBids] = useState('');
  const getBidById = async (id) => {
    let res = await fetch('/rest/bids/' + id);
    res = await res.json();
    setBids(res);
    console.log(res, "res")
  }
  const values = {
    bids,
    setBids,
    getBidById
  }

  return (
    <BidContext.Provider value={values}>
      {props.children}
    </BidContext.Provider>
   );
}
 
export default BidContextProvider;