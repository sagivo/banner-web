import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import mataImg from "./images/metamask.png";

export default function Auth(props) {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [account, setAccount] = useState(localStorage.getItem("account"));

  const disconnect = useCallback(() => {
    setAccount(null);
    props.setConnected(false);
    localStorage.removeItem("account");
  }, []);

  const connectUser = useCallback(async () => {
    console.log("connectUser");
    const { ethereum } = window;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        const acnt = ethers.utils.getAddress(accounts[0]);
        setAccount(acnt);
        props.setConnected(true);
        localStorage.setItem("account", acnt);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balanceBN = await provider.getBalance(acnt);
      } else disconnect();
    } catch (error) {
      console.error("getAccount ERROR", error);
      disconnect();
    }
  }, [disconnect]);

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
  }, [hasMetamask, connectUser, disconnect]);

  function accountDisplay() {
    return `${account.substring(0, 6)}..${account.substring(38)}`;
  }

  const hasMeta = () => {
    return !!account ? (
      <div>Connected {accountDisplay()}</div>
    ) : (
      <div>
        <button onClick={() => connectUser()}>CONNECT WALLET</button>
      </div>
    );
  };

  const noMeta = () => {
    return (
      <div>
        {/* <img src={mataImg} /> */}
        <a href="https://metamask.io/" target="_blank" className="external">
          Install MetaMask
        </a>{" "}
        to join.
      </div>
    );
  };

  return <div id="account">{hasMetamask ? hasMeta() : noMeta()}</div>;
}
