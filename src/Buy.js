import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { publishMessege } from "./utils/blockAccess";

export default function Buy(props) {
  const [tx, setTx] = useState();
  const [message, setmMessage] = useState();
  const [newPrice, setNewPrice] = useState();
  const [showAdvance, setShowAdvance] = useState(false);
  const STEP = 0.01;

  const { setTxPending } = props;

  useEffect(() => {
    if (props.price) {
      const suggested = props.price + STEP;
      setNewPrice(round(suggested));
    }
  }, [props.price, setTxPending]);

  const submit = async (e) => {
    e.preventDefault();
    if (props.signer) {
      const res = await publishMessege(
        props.signer,
        message,
        ethers.utils.parseEther(newPrice.toString()).toString()
      );
      if (res) {
        setTx(res);
        props.setTxPending(true);
      }
    }
  };

  const checkValue = (e) => {
    const newVal = parseFloat(e.target.value);
    if (isNaN(newVal) || newVal <= props.price) return;
    setNewPrice(newVal);
  };

  function round(num) {
    return Math.round(num * 100) / 100;
  }

  return props.price === 0 || !!props.price ? (
    <div id="buy">
      {tx ? (
        <div id="transaction">
          Please wait for{" "}
          <a
            href={`https://${process.env.REACT_APP_URL_PREFIX}etherscan.io/tx/${tx}`}
            target="_blank"
            rel="noreferrer"
            className="external"
          >
            transaction
          </a>{" "}
          to complete...{" "}
        </div>
      ) : (
        <form onSubmit={submit}>
          <div id="custom-button">
            <a href="#account" onClick={() => setShowAdvance(!showAdvance)}>
              {showAdvance ? "basic" : "advance"}
            </a>
          </div>
          <div className="clear"></div>
          <div className="grow-wrap">
            <textarea
              data-gramm_editor="false"
              id="newMessage"
              rows="1"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setmMessage(e.target.value)}
              maxLength="1000"
              required
              name="message"
              onInput={(e) =>
                (e.target.parentNode.dataset.replicatedValue = e.target.value)
              }
            ></textarea>
          </div>
          {showAdvance && (
            <div id="advance-setttings">
              Set custom price:
              <input
                type="number"
                step={STEP}
                min={round(props.price + STEP)}
                defaultValue={newPrice}
                onChange={checkValue}
              ></input>
              <div id="tip">
                Price has to be greater than Ξ{props.price}.
                <br />
                Message stays until someone pays more than you.
              </div>
            </div>
          )}
          <div>
            <input
              id="submit"
              type="submit"
              value={`Publish for Ξ${newPrice}`}
            />
          </div>
        </form>
      )}
    </div>
  ) : (
    ""
  );
}
