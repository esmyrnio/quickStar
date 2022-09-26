export default (
  <Router history={hashHistory}>
    <GlobalStyle />
    <Navbar />
    <Route path="/" component={App}>
      <indexRoute component={Model} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
);
