import Navbar from "./Navbar.js";
import Model from "./Model.js";
import About from "./About.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from "../styles/Styles.js";

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Model />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
