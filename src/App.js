import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Billboard from "./Billboard";
import Buy from "./Buy";
import {
  getPrice,
  getMessage,
  getPublisher,
  subsrubeToNewMessage,
} from "./utils/blockAccess";

function App() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [txDone, setTxDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setMessage(await getMessage());
      setPrice(await getPrice());
      setPublisher(await getPublisher());
      subsrubeToNewMessage((msg, pub, pri) => {
        setMessage(msg);
        setPrice(pri);
        setPublisher(pub);
        setTxDone(true);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagline">Your message to the world</div>
      <Billboard message={message} publisher={publisher} price={price} />
      <Auth
        message={message}
        setConnected={setConnected}
        setSigner={setSigner}
      />
      {txDone && <div>Transaction is complete 🎉</div>}
      {connected && !txDone && <Buy price={price} signer={signer} />}
      <h3>About</h3>
      <div id="info">
        Welcome to a decentralized social experiment 👋 <br />
        The billboard above exists on the Etherume blockchain. The message is
        censorship resistent and avaialble to everyone.
        <br />
        <br />
        The billboard also shows the owner and price paid for the message to be
        published.
        <br />
        In order to replace this message with your own message, you will need to
        pay any ETH amount greather the previous price paid.
        <br />
        <br />
        Your message will stay forever on the blockchain unless someone agrees
        to pay more to publish their message.
        <br />
        Publishing a message also provides the publisher with a unique BLBD NFT
        🦄.
        <br />
        <br />
        Got something to tell the world? Publish it now!
      </div>
      <hr />
      Footer
    </div>
  );
}

export default App;
