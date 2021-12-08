import React from "react";

class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h2>Упс... Что-то пошло не так.</h2>;
    }
    return this.props.children;
  }
}
export default ErrorBoundry;
