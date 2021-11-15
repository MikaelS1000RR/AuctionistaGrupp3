import { Button } from 'reactstrap';
import { useGlobal } from '../contexts/UserContextProvider';
import UploadIcon from '../assets/icons/UploadIcon.svg';
import { useProductContextProvider } from '../contexts/ProductContextProvider';
import { useBidContext } from '../contexts/BidContextProvider';
const Bid = (props) => {
  const { userId } = useGlobal();
  const { fetchProductBySearch, getProductById } = useProductContextProvider();
  const { bidTitle, bidLocation, bidCategory } = useBidContext();

  const makeBid = async () => {
    let newPrice = props.startingPrice;
    let largestBid = props.maxBid;
    let inputBid = Number(props.bidIncrease);
    console.log(inputBid, "inputBid")
    console.log(largestBid, "largestBid")
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
      console.log(inputBid, "inputBid")
      if (inputBid) {
        console.log(inputBid,"inputBid")
        bidToDb += inputBid;
        console.log(bidToDb, "bidToDb")
      } else {
        bidToDb = props.maxBid * 1.10;
      }
    }
    
    console.log(props, "props")
    console.log('You clicked makeBid')
    console.log(bidToDb, "bidToDb")

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
      swal("Success", "Your bid has been registered!", "success");
      console.log(await res.json(), " res")
      
      let obj = {
        title: bidTitle,
        location: bidLocation,
        category: bidCategory
      }
      fetchProductBySearch(obj);
      getProductById(props.productId)

    } catch {
      console.log('Bid did not work')
    }
    
  }
  return (
    <div>
      {/* <button className="placebid-btn" onClick={makeBid}>
        <img src={UploadIcon} className="placebid-btn-icon" />
        <p className="placebid-txt">Place bid</p>
      </button> */}
      <div className="bidbtn-wrap" onClick={makeBid}>
              <button className="placebid">
                <img src={UploadIcon}/>
                <p className="bidbtn-text">Place bid above leading price</p>
              </button>
            </div>
    </div>
   );
}
 
export default Bid;