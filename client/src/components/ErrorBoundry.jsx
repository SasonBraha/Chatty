import React, { Component } from 'react';
import styled from 'styled-components';

class ErrorBoundry extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    return hasError 
      ? (
        <StyledError>משהו לא בסדר</StyledError>
      ) : (
        this.props.children
      )
  }
}

const StyledError = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff0018;
  color: white;
`;

export default ErrorBoundry;
