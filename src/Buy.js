import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { publishMessege } from "./utils/blockAccess";

export default function Buy(props) {
  const [tx, setTx] = useState(
    "0xbaf4a026ae9d4d497f1d5f183897c5b92b37e7e60c130f6b0569426f0b3c1eb2"
  );
  const [message, setmMessage] = useState();
  const [newPrice, setNewPrice] = useState();
  const [showAdvance, setShowAdvance] = useState(false);
  const STEP = 0.01;

  useEffect(() => {
    if (props.price) {
      const suggested = props.price + STEP;
      setNewPrice(Math.round(suggested * 100) / 100);
    }
  }, [props.price]);

  const submit = async (e) => {
    e.preventDefault();
    if (props.signer) {
      const res = publishMessege(
        props.signer,
        message,
        ethers.utils.parseEther(newPrice.toString()).toString()
      );
      if (res) setTx(res);
    }
  };

  const checkValue = (e) => {
    const newVal = parseFloat(e.target.value);
    if (isNaN(newVal) || newVal <= props.price) return;
    setNewPrice(newVal);
  };

  return props.price === 0 || !!props.price ? (
    <div id="buy">
      {tx ? (
        <div id="transaction">
          <a
            href={`https://etherscan.io/tx/${tx}`}
            target="_blank"
            className="external"
          >
            view transaction
          </a>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div id="custom-button">
            <a onClick={() => setShowAdvance(!showAdvance)}>
              {showAdvance ? "basic" : "advance"}
            </a>
          </div>
          <div className="clear"></div>
          <div className="grow-wrap">
            <textarea
              data-gramm_editor="false"
              id="newMessage"
              rows="1"
              placeholder="Your message..."
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
                min={props.price + STEP}
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
