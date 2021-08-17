import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Billboard from "./Billboard";
import { getPrice, getMessage } from "./utils/blockAccess";

function App() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();

  fetchBlockData();

  async function fetchBlockData() {
    setMessage(await getMessage());
    setPrice(await getPrice());
  }

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagling">Your message to the world</div>
      <Auth message={message} price={price} />
      <Billboard />

      <div id="actions"></div>

      <h2>About</h2>
    </div>
  );
}

export default App;
