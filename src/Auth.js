import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

export default function Auth(props) {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [balance, setBalance] = useState(0);
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
        const acnt = ethers.utils.getAddress(accounts[0]);
        setAccount(acnt);
        localStorage.setItem("account", acnt);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balanceBN = await provider.getBalance(acnt);
        setBalance(balanceDisplay(balanceBN));
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
    return `${account.substring(0, 4)}..${account.substring(38)}`;
  }

  function balanceDisplay(balanceBN) {
    return (
      Math.round(
        parseFloat(ethers.utils.formatEther(balanceBN.toString())) * 100
      ) / 100
    );
  }

  const hasMeta = () => {
    return !!account ? (
      <div>
        <span>{balance} ETH</span> <span>{accountDisplay()}</span>
      </div>
    ) : (
      <div>
        <button onClick={() => connectUser()}>Connect</button>
      </div>
    );
  };

  const noMeta = () => {
    return <div>No</div>;
  };

  return <div id="account">{hasMetamask ? hasMeta() : noMeta()}</div>;
}
