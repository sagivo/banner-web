import { useEffect, useState } from "react";
import "./App.css";
import Billboard from "./Billboard";
import Buy from "./Buy";
import { subsrubeToNewMessage, getInfo } from "./utils/blockAccess";

function App() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [signer, setSigner] = useState();
  const [txPending, setTxPending] = useState(false);
  const [txDone, setTxDone] = useState(false);
  const [chain, setChain] = useState("rinkeby");
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const appendScript = (scriptToAppend) => {
        const script = document.createElement("script");
        script.src = scriptToAppend;
        script.async = true;
        document.body.appendChild(script);
      };

      appendScript('https://www.googletagmanager.com/gtag/js?id=G-6WS15T0K6D"');
      appendScript(process.env.PUBLIC_URL + "/FS.js");
    }
  }, []);

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

  const showHP = () => {
    return (
      <div>
        {chain && (
          <Billboard
            setSigner={setSigner}
            setChain={setChain}
            message={message}
            publisher={publisher}
            price={price}
            setUserId={setUserId}
          />
        )}
      </div>
    );
  };

  const showBuy = () => {
    return (
      <div>
        {txDone && (
          <div id="complete">
            Transaction is done. <br /> Your message is on the billboard 🎉
          </div>
        )}
        {userId && !txDone && chain && (
          <Buy
            price={price}
            signer={signer}
            setTxPending={setTxPending}
            chain={chain}
          />
        )}
        <div id="info">
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
          The billboard also shows the owner and price paid for the message to
          be published.
          <br />
          To override this message with your own, you will need to pay more ETH
          than the previous price paid.
          <br />
          <br />
          Publishers are gifted a unique BLBD NFT 🦄.
          <br />
          <br />
          Your message will stay forever on the blockchain unless someone
          decides to pay more to publish their message instead.
          <br />
          <br />
          Got something to tell the world? Publish it now!
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagline">
        Publish your message to be part of the blockchain history!
      </div>
      {chain !== "mainnet" && (
        <div id="chain">- {chain ? chain : "unsupported network"} -</div>
      )}

      {showHP()}
      {showBuy()}

      <hr />
      <div id="footer">
        Make history - publish your message on the billboard blockchain.
      </div>
    </div>
  );
}

export default App;
