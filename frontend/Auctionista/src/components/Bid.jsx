import { Button } from 'reactstrap';
import { useGlobal } from '../contexts/UserContextProvider';

const Bid = (props) => {
  const { userId } = useGlobal();

  // var time = new Date();
  const makeBid = async () => {
    let newPrice = props.startingPrice;
    if (props.bidIncrease) {
      newPrice += props.bidIncrease;
    } else {
      newPrice = props.startingPrice * 1.10;
    }
    console.log(props, "props")
    // const newPrice = props.startingPrice * 1.10;
    console.log('You clicked makeBid')
    // console.log(time, "time")
    const bidValues = {
      bidderTime: new Date(),
      price: newPrice,
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
      <Button onClick={makeBid}>Bid</Button>
    </div>
   );
}
 
export default Bid;