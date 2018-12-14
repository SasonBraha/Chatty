import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldRedirect();
    }

    componentDidUpdate() {
      this.shouldRedirect();
    }

    shouldRedirect() {
      const { isAuthenticated, history } = this.props;
      if (isAuthenticated) history.push('/');
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
    isAuthenticated
  });
  return connect(mapStateToProps, null)(ComposedComponent);
};
