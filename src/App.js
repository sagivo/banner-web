import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Billboard from "./Billboard";
import Buy from "./Buy";
import { getPrice, getMessage, getPublisher } from "./utils/blockAccess";

function App() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();

  fetchBlockData();

  async function fetchBlockData() {
    setMessage(await getMessage());
    setPrice(await getPrice());
    setPublisher(await getPublisher());
  }

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagling">Your message to the world</div>
      <Auth message={message} />
      <Billboard publisher={publisher} price={price} />
      <Buy price={price} />

      <h2>About</h2>
    </div>
  );
}

export default App;
