import Navbar from "./Navbar.js";
import Model from "./Model.js";
import About from "./About.js";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from "../styles/Styles.js";

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };
  render() {
    const { children } = this.props;
    this.return(<div>{children}</div>);
  }
}
export default App;
