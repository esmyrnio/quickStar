import React from "react";

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
export default App;
