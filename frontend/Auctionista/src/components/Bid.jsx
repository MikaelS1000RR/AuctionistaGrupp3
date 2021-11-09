import { Button } from 'reactstrap';
import { useGlobal } from '../contexts/UserContextProvider';
import UploadIcon from '../assets/icons/UploadIcon.svg';

const Bid = (props) => {
  const { userId } = useGlobal();

  const makeBid = async () => {
    let newPrice = props.startingPrice;
    let largestBid = props.maxBid;
    let bidToDb = 0;
    if (largestBid == 0) {
      bidToDb = newPrice;
      if (props.bidIncrease) {
        bidToDb += props.bidIncrease;
      } else {
        bidToDb = props.startingPrice * 1.10;
      }
    } else {
      bidToDb = props.maxBid;
      if (props.bidIncrease) {
        bidToDb += props.bidIncrease;
      } else {
        bidToDb = props.maxBid * 1.10;
      }
    }
    
    console.log(props, "props")
    console.log('You clicked makeBid')
    
    const bidValues = {
      bidderTime: new Date(),
      price: bidToDb,
      productId: {
        id: props.product
      },
      bidderId: {
        id: userId
      }
    }
    console.log(bidValues, "bidValues")
    try {
      let res = await fetch('/rest/bids', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bidValues)
      })
    } catch {
      console.log('Bid did not work')
    }
  }
  return (
    <div>
      <button className="placebid-btn" onClick={makeBid}>
        <img src={UploadIcon} className="placebid-btn-icon" />
        <p className="placebid-txt">Place bid</p>
      </button>
    </div>
   );
}
 
export default Bid;