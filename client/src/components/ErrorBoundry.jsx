import React, { Component } from 'react';
import styled from 'styled-components';

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(ex) {
    return {
      hasErr: true,
    };
  }

  render() {
    return this.state.hasError ? (
      <StyledErrorBoundry>אוי! משהו השתבש.</StyledErrorBoundry>
    ) : (
      this.props.children
    );
  }
}

const StyledErrorBoundry = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--danger-color);
  color: white;
  font-size: 2rem;
`;

export default ErrorBoundry;
