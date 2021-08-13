import React, { useState, useEffect, useCallback } from "react";
import { getPrice, getMessage } from "./utils/blockAccess";

export function Foo() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [hasMetamask, setHasMetamask] = useState(false);
  const [account, setAccount] = useState(localStorage.getItem("account"));

  const disconnect = useCallback(() => {
    setAccount(null);
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
        setAccount(accounts[0]);
        localStorage.setItem("account", accounts[0]);
      } else disconnect();
    } catch (error) {
      console.error("getAccount ERROR", error);
      disconnect();
    }
  }, [disconnect]);

  useEffect(() => {
    console.log("useEffect");
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
    } else {
      //no metamask
    }

    fetchBlockData();
  }, [hasMetamask, connectUser, disconnect]);

  async function fetchBlockData() {
    setMessage(await getMessage());
    setPrice(await getPrice());
  }

  const hasMeta = () => {
    return !!account ? (
      <div>{account}</div>
    ) : (
      <div>
        <button onClick={() => connectUser()}>Connect</button>
      </div>
    );
  };

  const noMeta = () => {
    return <div>No</div>;
  };

  // Similar to componentDidMount and componentDidUpdate:  useEffect(() => {    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div>
      <div>Message: {message}</div>
      <div>Price: Ξ{price}</div>
      {hasMetamask ? hasMeta() : noMeta()}
    </div>
  );
}
