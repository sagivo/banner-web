import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Billboard from "./Billboard";
import Buy from "./Buy";
import { getPrice, getMessage, getPublisher } from "./utils/blockAccess";

function App() {
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setMessage(await getMessage());
      setPrice(await getPrice());
      setPublisher(await getPublisher());
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>CRYPTO BILLBOARD</h1>
      <div id="tagline">Your message to the world</div>
      <Billboard message={message} publisher={publisher} price={price} />
      <Auth
        message={message}
        setConnected={setConnected}
        setSigner={setSigner}
      />
      {connected && <Buy price={price} signer={signer} />}
      <h2>About</h2>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis
        orci a scelerisque purus. Aenean vel elit scelerisque mauris
        pellentesque. Cursus mattis molestie a iaculis. Dis parturient montes
        nascetur ridiculus. Euismod nisi porta lorem mollis aliquam. Ultrices
      </div>
      <hr />
      Footer
    </div>
  );
}

export default App;
