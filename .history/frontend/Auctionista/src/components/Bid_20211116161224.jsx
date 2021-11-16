import { Button } from 'reactstrap';
import { useGlobal } from '../contexts/UserContextProvider';
import UploadIcon from '../assets/icons/UploadIcon.svg';
import { useProductContextProvider } from '../contexts/ProductContextProvider';
import { useBidContext } from '../contexts/BidContextProvider';

const Bid = (props) => {
  const { userId } = useGlobal();
  const { fetchProductBySearch, getProductById } = useProductContextProvider();
  const { bidTitle, bidLocation, bidCategory, bidOnSell } = useBidContext();


  const makeBid = async () => {
    let newPrice = props.startingPrice;
    let largestBid = props.maxBid;
    let inputBid = Number(props.bidIncrease);
    let bidToDb = 0;
    if (largestBid == 0) {
      bidToDb = newPrice;
      if (inputBid) {
        bidToDb += inputBid;
      } else {
        bidToDb = props.startingPrice * 1.10;
      }
    } else {
      bidToDb = props.maxBid;
      if (inputBid) {
        bidToDb += inputBid;
      } else {
        bidToDb = props.maxBid * 1.10;
      }
    }

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
    try {
      let res = await fetch('/rest/bids', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bidValues)
      })
      swal("Success", "Your bid has been registered!", "success");

      let obj = {
        title: bidTitle,
        location: bidLocation,
        category: bidCategory,
        onSell: bidOnSell
      }
      fetchProductBySearch(obj)
console.log();
      // if(props.productId.length > 0) {

      //   getProductById(props.productId)
      // }


    } catch {
      console.log('Bid did not work')
    }

  }
  return (
    <div>
      <div className="bidbtn-wrap" onClick={makeBid}>
        <button className="placebid">
          <img src={UploadIcon} />
          <p className="bidbtn-text">Place bid above leading price</p>
        </button>
      </div>
    </div>
  );
}

export default Bid;