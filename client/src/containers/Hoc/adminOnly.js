import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from './requireAuth';
import ErrorPage from '../ErrorPage';

export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      const { userRole } = this.props;
      return userRole === 'Admin' ? <ChildComponent {...this.props} /> : <ErrorPage statusCode={403} />;
    }
  }

  const mapStateToProps = ({ auth: { userData: { role } } }) => ({
    userRole: role
  });
  return connect(mapStateToProps, null)(requireAuth(ComposedComponent));
};
