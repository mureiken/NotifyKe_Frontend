import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h3>Something went wrong....</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;