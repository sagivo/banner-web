import React, { useEffect, useState, useCallback } from "react";
import { accountDisplay } from "./General";
import { ethers } from "ethers";

function Billboard(props) {
  const [fontSize, setFontSize] = useState(12);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [account, setAccount] = useState(localStorage.getItem("account"));
  const { setUserId, setSigner, setChain, message } = props;

  const disconnect = useCallback(() => {
    setAccount(null);
    setUserId(null);
    localStorage.removeItem("account");
  }, [setUserId]);

  const connectUser = useCallback(async () => {
    console.log("connectUser");
    const supportedChains = {
      "0x1": "mainnet",
      "0x4": "rinkeby",
    };

    const { ethereum } = window;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        const acnt = ethers.utils.getAddress(accounts[0]);
        setAccount(acnt);
        setUserId(acnt);
        localStorage.setItem("account", acnt);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const chainId = await ethereum.request({ method: "eth_chainId" });
        setChain(supportedChains[chainId]);
      } else disconnect();
    } catch (error) {
      console.error("getAccount ERROR", error);
      disconnect();
    }
  }, [disconnect, setUserId, setSigner, setChain]);

  useEffect(() => {
    const { ethereum } = window;
    setHasMetamask(ethereum && ethereum.isMetaMask);

    if (hasMetamask) {
      ethereum.on("accountsChanged", (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts.length) connectUser();
        else disconnect();
      });
      ethereum.on("disconnect", () => {
        console.log("disconnect");
        disconnect();
      });
      ethereum.on("chainChanged", (chainId) => {
        console.log("chainChanged", chainId);
        window.location.reload();
      });
      // update9
      if (account) connectUser();
    } else {
      //no metamask
    }
  }, [hasMetamask, connectUser, disconnect, account]);

  useEffect(() => {
    const len = message ? message.length : 1000;
    if (len > 800) setFontSize(16);
    else if (len > 500) setFontSize(20);
    else if (len > 250) setFontSize(30);
    else if (len > 190) setFontSize(34);
    else if (len > 100) setFontSize(40);
    else if (len > 50) setFontSize(50);
    else if (len > 20) setFontSize(55);
    else if (len > 10) setFontSize(60);
    else if (len > 6) setFontSize(100);
    else if (len > 3) setFontSize(130);
    else setFontSize(200);
  }, [message]);

  function publisherDisplay() {
    if (props.publisher)
      return `${props.publisher.substring(0, 6)}..${props.publisher.substring(
        38
      )}`;
  }

  return (
    <div id="container">
      <div id="sky">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div id="star1" className="stars">
          *
        </div>
        <div id="star2" className="stars">
          *
        </div>
        <div id="star3" className="stars">
          *
        </div>
        <div id="star4" className="stars">
          *
        </div>
        <div id="star5" className="stars">
          *
        </div>
        <div id="star6" className="stars">
          *
        </div>
        <div id="star7" className="stars">
          *
        </div>
      </div>
      <div id="billboard" style={{ fontSize: `${fontSize}px` }}>
        {props.message}
      </div>

      <div id="lights">
        <div id="light1" className="light"></div>
        <div id="light2" className="light"></div>
      </div>

      <div id="pole"></div>

      <div id="base-price">
        <div className="price-pole">&nbsp;</div>
        {hasMetamask && account
          ? "CONNECTED " + accountDisplay(account)
          : hasMetamask && (
              <button onClick={() => connectUser()}>CONNECT WALLET</button>
            )}
        {!hasMetamask && "Install MetaMask to join"}
        <div className="price-pole">&nbsp;</div>
      </div>

      <div id="base">
        Paid Ξ{props.price} By &nbsp;
        <a
          href={`https://${process.env.REACT_APP_URL_PREFIX}etherscan.io/address/${props.publisher}`}
          target="_blank"
          rel="noreferrer"
          className="external"
        >
          {publisherDisplay()}
        </a>
      </div>
      <div id="road"></div>
    </div>
  );
}

export default Billboard;
