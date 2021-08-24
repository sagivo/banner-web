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
  const [showMore, setShowMore] = useState(false);

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
          <p>Crypto Billboard is a decentralized social publishing zone.</p>
          <p>
            The billboard above{" "}
            <a
              href={`https://${process.env.REACT_APP_URL_PREFIX}etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
              className="external"
              target="_blank"
              rel="noreferrer"
            >
              exists
            </a>{" "}
            on the Etherume blockchain. The message is censorship-resistant and
            available to everyone 24/7.
          </p>
          <p>
            The billboard enables everyone to publish their own message on it.
            <br />
            The message stays forever on the billboard unless overrided buy
            someone else.
            <br />
            The publishing price only goes up and must be greather than the last
            price paid.
          </p>
          <p>
            Publishers are also gifted a unique BLBD NFT. These NFTs are minted
            only when publishing a new message and their number is capped by the
            number of publishers.
          </p>
          {!showMore && (
            <p>
              <button onClick={() => setShowMore(!showMore)}>Learn more</button>
            </p>
          )}
          {showMore && <div id="more">some more info</div>}
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

      <div id="footer">
        Make history - publish your message on the billboard blockchain.
      </div>
    </div>
  );
}

export default App;
