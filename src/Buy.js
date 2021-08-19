import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

export default function Buy(props) {
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

  const mySubmitHandler = (event) => {
    event.preventDefault();
  };

  const checkValue = (e) => {
    const newVal = parseFloat(e.target.value);
    if (isNaN(newVal) || newVal <= props.price) return;
    setNewPrice(newVal);
  };

  return props.price === 0 || !!props.price ? (
    <div id="buy">
      <form onSubmit={mySubmitHandler}>
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
          <div>
            Set custom price:
            <input
              type="number"
              step={STEP}
              min={props.price + STEP}
              defaultValue={newPrice}
              onChange={checkValue}
            ></input>
            <div id="tip">
              The message will stay unless someone pays more than your price.
            </div>
          </div>
        )}
        <div>
          <input id="submit" type="submit" value={`Publish for Ξ${newPrice}`} />
        </div>
        <div>
          <a onClick={() => setShowAdvance(!showAdvance)}>
            {showAdvance ? "basic" : "advance"}
          </a>
        </div>
      </form>
    </div>
  ) : (
    ""
  );
}
