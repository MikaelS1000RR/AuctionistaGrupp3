import { Button } from 'reactstrap';
import { useGlobal } from '../contexts/UserContextProvider';

const Bid = (props) => {
  const { userId } = useGlobal();

  // var time = new Date();
  const makeBid = async () => {
    console.log(props, "props")

    console.log('You clicked makeBid')
    // console.log(time, "time")
    const bidValues = {
      bidderTime: new Date(),
      price: props.startingPrice,
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