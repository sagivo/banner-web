import React, { useEffect, useState } from "react";

function Billboard(props) {
  // const [message] = useState("So I just want to say Hello! So I just");
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    const len = props.message ? props.message.length : 1000;
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
  }, [props.message]);

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
        <div className="price-pole"></div>
        <div>PAID Ξ{props.price}</div>
        <div className="price-pole"></div>
      </div>

      <div id="base">
        <a
          href={"https://etherscan.io/address/" + props.publisher}
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
