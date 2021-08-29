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
    //redirect NFTs
    if (window.location.href.includes("/NFT/"))
      window.location.replace("/NFT/BLBD.json");

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
          <p>Crypto Billboard is a decentralized social publishing.</p>
          <p>
            The billboard above is{" "}
            <a
              href={`https://${process.env.REACT_APP_URL_PREFIX}etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
              className="external"
              target="_blank"
              rel="noreferrer"
            >
              stored
            </a>{" "}
            on the Ethereum blockchain. The message is censorship-resistant and
            available to everyone 24/7.
          </p>
          <p>
            The billboard enables everyone to publish their own message on it.
            <br />
            The message stays forever on the billboard unless overrode by
            someone else.
            <br />
            The publishing price only goes up and must be greater than the last
            price paid.
          </p>
          <p>
            Publishers are awarded a unique{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="external"
              href="https://gateway.pinata.cloud/ipfs/QmNgowFAHNHDBqKmRtL327nUvEFSCpnz4T2sgLoBGttdgz"
            >
              BLBD NFT
            </a>
            . The number of BLBD NFTs is capped by the number of total
            publishers.
          </p>
          {!showMore && (
            <p>
              <button
                className="naked-button"
                onClick={() => setShowMore(!showMore)}
              >
                Learn more
              </button>
            </p>
          )}
          {showMore && (
            <div id="more">
              <hr />
              <p>Q: What is Crypto Billboard?</p>
              <p>
                A: Crypto Billboard is a social experiment backed by the
                blockchain. Traditional media companies decide what to publish
                and control who can see the content. This billboard democratizes
                publishing. No matter if it's an advise, a joke, or a marriage
                proposal - anyone can publish their own content on this
                billboard. The billboard automatically updates every time
                there's a new content. Becase the message is on the blockchain -
                no one can take it down or edit it.
              </p>
              <p>Q: How do I publish my message?</p>
              <p>
                To publish a message you can choose any Ether amount greater
                than the current base price. The base price is the price last
                paid to publish. Your price then becomes the new base price for
                others. The higher you set the base price the harder it will be
                to override your message.
              </p>
              <p>Q: How do I connect to Ethereum wallet?</p>
              <p>
                A: The easiest way to connect to the Ethereum mainnet is to use
                the{" "}
                <a
                  href="https://metamask.io"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  MetaMask
                </a>{" "}
                plugin for your browser. To have Ether in your wallet you will
                need to buy some from an exchange like{" "}
                <a
                  href="https://www.coinbase.com/join/ofek_q"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  Coinbase
                </a>
                .
              </p>
              <p>Q: What about the NFT?</p>
              <p>
                Q: When you purchase a message you also get a{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                  href="https://gateway.pinata.cloud/ipfs/QmNgowFAHNHDBqKmRtL327nUvEFSCpnz4T2sgLoBGttdgz"
                >
                  BLBD NFT
                </a>
                . This NFT is credited to you and you are welcome to transfer or
                sell it at any time. While there is no actual value to the NFT,
                only people who publish a message get it. Because the price
                always goes up, the sooner you publish a message the cheaper you
                pay for the NFT.
              </p>
              <p>Q: Why should I do it?</p>
              <p>
                Do you have a message to the world? Do you want to be part of an
                exclusive group? Do you want to own a BLBD NFT? If the answer is
                yes,{" "}
                <a
                  href="https://www.youtube.com/watch?v=ZXsQAXx_ao0"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  just do it
                </a>
                .
              </p>
              <p>Where I can find out more?</p>
              <p>
                You can read the motivation behind this experiment{" "}
                <a
                  href="https://sagivo.com/startup/crypto/publishing/2021/08/27/Crypto-Billboard.html"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  here
                </a>
                .<br />
                Join us on{" "}
                <a
                  href="https://discord.gg/sTgSC95acY"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  Discord
                </a>
                , follow us on{" "}
                <a
                  href="https://twitter.com/CryptoBLBD"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  Twitter
                </a>
                , or check our open-source code in{" "}
                <a
                  href="https://github.com/puffygeek/crypto-billboard"
                  target="_blank"
                  rel="noreferrer"
                  className="external"
                >
                  GitHub
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagline">
        Post your message and be part of the blockchain history!
      </div>
      {chain !== "mainnet" && (
        <div id="chain">
          - {chain ? chain : "Usupported network. Please switch to mainnet"} -
        </div>
      )}

      {showHP()}
      {showBuy()}

      <div id="footer">
        Make history - publish your message on the billboard. Empowered by the
        blockchain.
      </div>
    </div>
  );
}

export default App;
