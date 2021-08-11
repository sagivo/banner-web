import logo from "./logo.svg";
import "./App.css";
import { Foo } from "./Foo";

function App() {
  return (
    <div className="App">
      <Foo />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        Yo2
      </header>
    </div>
  );
}

export default App;
