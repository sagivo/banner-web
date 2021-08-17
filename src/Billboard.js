import React, { useEffect, useState } from "react";
import fitty from "fitty";

function Billboard() {
  const [message] = useState("So I just want to say Hello! So I just");
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    // fitty("#billboard");
    loadFont();
    console.log(window.innerWidth);
  }, []);

  function loadFont() {
    console.log(message.length);
    if (message.length > 800) setFontSize(16);
    else if (message.length > 500) setFontSize(20);
    else if (message.length > 250) setFontSize(30);
    else if (message.length > 190) setFontSize(34);
    else if (message.length > 100) setFontSize(40);
    else if (message.length > 50) setFontSize(50);
    else if (message.length > 20) setFontSize(55);
    else if (message.length > 10) setFontSize(60);
    else if (message.length > 6) setFontSize(100);
    else if (message.length > 3) setFontSize(130);
    else setFontSize(200);
  }

  return (
    <div id="container">
      <div id="sky">
        <div class="stars shooting-star"></div>
        <div class="stars shooting-star"></div>
        <div id="star1" class="stars">
          *
        </div>
        <div id="star2" class="stars">
          *
        </div>
        <div id="star3" class="stars">
          *
        </div>
        <div id="star4" class="stars">
          *
        </div>
        <div id="star5" class="stars">
          *
        </div>
        <div id="star6" class="stars">
          *
        </div>
        <div id="star7" class="stars">
          *
        </div>
      </div>
      <div id="billboard" style={{ fontSize: `${fontSize}px` }}>
        {message}
      </div>

      <div id="lights">
        <div class="light"></div>
        <div class="light light1"></div>
      </div>

      <div id="pole"></div>
      <div id="road"></div>
    </div>
  );
}

export default Billboard;
