import "./App.css";
import { Foo } from "./Foo";
import Billboard from "./Billboard";

function App() {
  return (
    <div className="App">
      <h1>Crypto Billboard</h1>
      <Billboard />

      <div id="actions"></div>
      <Foo />
      <h2>About</h2>
    </div>
  );
}

export default App;
