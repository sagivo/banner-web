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
  const [chain, setChain] = useState("rinkeby");

  useEffect(() => {
    async function fetchData() {
      const setVars = (msg, pri, pub) => {
        setMessage(msg);
        setPrice(pri);
        setPublisher(pub);
      };

      const [msg, pri, pub] = await getInfo(chain);
      setVars(msg, pri, pub);

      subsrubeToNewMessage(chain, (msg, pri, pub) => {
        setVars(msg, pri, pub);
        if (txPending) setTxDone(true);
      });
    }
    if (chain) fetchData(chain);
  }, [txPending, chain]);

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagline">Your message to the world</div>
      {chain && (
        <Billboard message={message} publisher={publisher} price={price} />
      )}
      {chain !== "mainnet" && (
        <div id="chain">- {chain ? chain : "unsupported network"} -</div>
      )}
      <Auth
        message={message}
        setConnected={setConnected}
        setSigner={setSigner}
        setChain={setChain}
      />
      {txDone && <div>Transaction is complete 🎉</div>}
      {connected && !txDone && chain && (
        <Buy
          price={price}
          signer={signer}
          setTxPending={setTxPending}
          chain={chain}
        />
      )}

      <div id="info">
        <h3>About</h3>
        Welcome to a decentralized social experiment 👋 <br />
        The billboard above{" "}
        <a
          href={`https://${process.env.REACT_APP_URL_PREFIX}etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
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
      {process.env.NODE_ENV === "production" && <script srt="/FS.js"></script>}
    </div>
  );
}

export default App;
