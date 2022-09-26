import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Model} />
      <Route path="about" component={About} />
    </Route>
  </Router>
);
