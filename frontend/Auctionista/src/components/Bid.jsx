import { Button } from 'reactstrap';

const Bid = () => {
  const [bidderTime, setBidderTime] = useState('');
  const [price, setPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [bidderId, setBidderId] = useState('');
  
  const makeBid = async () => {
    console.log('You clicked makeBid')
    const values = {
      bidderTime,
      price,
      productId,
      bidderId
    }
    try {
      let res = await fetch('/rest/bids', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
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