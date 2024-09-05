import logo from "./logo.svg";
import "./App.css";
import { MemeTempData } from "./Data";
import {MagiCCard} from "./Components";

function App() {
  /**
   * to render a component and an additional home page maybe
   * readng data from a static set of array
   * implement pagination on self, - write a function that takes page and number of pics and returns data accordingly
   *
   */
  return (
    <div className="App">
      <header className="App-header">APP HEADER</header>

      <div className="Meme-template-container">
        {MemeTempData.map((data, index) => (
          <MagiCCard imageUrl={data} />
        ))}
      </div>
    </div>
  );
}

export default App;
