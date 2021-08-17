import React, { useEffect, useState, useCallback } from "react";

function Billboard() {
  const [message] = useState("So I just want to say Hello! So I just");
  const [fontSize, setFontSize] = useState(12);

  const loadFont = useCallback(() => {
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
  });

  useEffect(() => {
    loadFont();
  }, [loadFont]);

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
        {message}
      </div>

      <div id="lights">
        <div className="light"></div>
        <div className="light light1"></div>
      </div>

      <div id="pole"></div>
      <div id="road"></div>
    </div>
  );
}

export default Billboard;
