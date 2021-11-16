import { createContext, useState, useContext, useEffect } from 'react'

export const BidContext = createContext();
export const useBidContext = () => useContext(BidContext);

const BidContextProvider = (props) => {
  const [bidsByProductId, setBidsByProductId] = useState('');
  const [bidTitle, setBidTitle] = useState('');
  const [bidLocation, setBidLocation] = useState(0);
  const [bidCategory, setBidCategory] = useState(0);
  const [bidOnSell, setBidOnSell] 
  const getBidByProductId = async (id) => {
    let res = await fetch('/rest/bids/productId/' + id);
    res = await res.json();
    setBidsByProductId(res)
  }


  const [bids, setBids] = useState('');
  const getBidById = async (id) => {
    let res = await fetch('/rest/bids/' + id);
    res = await res.json();
    setBids(res);
  }
  
  const values = {
    bidTitle,
    setBidTitle,
    bidLocation,
    setBidLocation,
    bidCategory,
    setBidCategory,
    bids,
    setBids,
    getBidById,
    getBidByProductId,
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