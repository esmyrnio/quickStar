import Navbar from "./Navbar.js";
import Model from "./Model.js";
import About from "./About.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from "../styles/Styles.js";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Navbar />
      <Model />
      <About />
    </div>
  );
}

export default App;
