import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Billboard from "./Billboard";
import Buy from "./Buy";
import { subsrubeToNewMessage, getInfo } from "./utils/blockAccess";

function App() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txDone, setTxDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const setVars = (msg, pri, pub) => {
        setMessage(msg);
        setPrice(pri);
        setPublisher(pub);
      };

      const [msg, pri, pub] = await getInfo();
      setVars(msg, pri, pub);

      subsrubeToNewMessage((msg, pri, pub) => {
        setVars(msg, pri, pub);
        if (txPending) setTxDone(true);
      });
    }
    fetchData();
  }, [txPending]);

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
      {connected && !txDone && (
        <Buy price={price} signer={signer} setTxPending={setTxPending} />
      )}

      <div id="info">
        <h3>About</h3>
        Welcome to a decentralized social experiment 👋 <br />
        The billboard above{" "}
        <a
          href={`https://rinkeby.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
          className="external"
          target="_blank"
          rel="noreferrer"
        >
          exists on the Etherume blockchain
        </a>{" "}
        The message is censorship-resistant and available to everyone.
        <br />
        <br />
        The billboard also shows the owner and price paid for the message to be
        published.
        <br />
        To override this message with your own, you will need to pay more ETH
        than the previous price paid.
        <br />
        <br />
        Publishers are gifted a unique BLBD NFT 🦄.
        <br />
        <br />
        Your message will stay forever on the blockchain unless someone decides
        to pay more to publish their message instead.
        <br />
        <br />
        Got something to tell the world? Publish it now!
      </div>
      <hr />
      <div id="footer">Footer</div>
    </div>
  );
}

export default App;
