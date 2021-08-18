import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

export default function Buy(props) {
  const [message, setmMessage] = useState();
  useEffect(() => {}, []);

  function getMinPrice() {
    const num = ethers.utils.parseEther(props.price);
    const minAdd = ethers.utils.parseEther("0.01");
    const newMinPrice = ethers.utils.formatEther(num.add(minAdd));

    return Math.round(parseFloat(newMinPrice) * 100) / 100;
  }

  const mySubmitHandler = (event) => {
    event.preventDefault();
  };

  return props.price ? (
    <div id="buy">
      <form onSubmit={mySubmitHandler}>
        <div>
          <textarea
            id="newMessage"
            placeholder="your message"
            value={message}
            onChange={(e) => setmMessage(e.target.value)}
            maxLength="1000"
            required
          />
        </div>
        <div>
          <input type="submit" value="POST" />
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            min={getMinPrice()}
            defaultValue={getMinPrice()}
          ></input>
        </div>
      </form>
    </div>
  ) : (
    ""
  );
}
