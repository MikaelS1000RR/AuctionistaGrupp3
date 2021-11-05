import { createContext, useState, useContext, useEffect } from 'react'

export const BidContext = createContext();
export const useBidContext = () => useContext(BidContext);

const BidContextProvider = (props) => {
  const [bidsByProductId, setBidsByProductId] = useState('');
  const getBidByProductId = async (id) => {
    let res = await fetch('/rest/bids/productId/' + id);
    res = await res.json();
    setBidsByProductId(res)
    // setBids(res);
    console.log(res, "res")
  }


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
    getBidById,
    bidsByProductId,
    setBidsByProductId
  }

  return (
    <BidContext.Provider value={values}>
      {props.children}
    </BidContext.Provider>
   );
}
 
export default BidContextProvider;