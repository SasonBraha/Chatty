import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToast } from '../../redux/actions';
import { LAST_URL_PATH, SIGN_IN_URL } from '../../resources/constants';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldRedirect();
    }

    componentDidUpdate() {
      this.shouldRedirect();
    }

    shouldRedirect() {
      const { isAuthenticated, history, setToast } = this.props;
      if (!isAuthenticated) {
        localStorage.setItem(LAST_URL_PATH, window.location.pathname);
        history.push(SIGN_IN_URL);
        setToast('עליך להתחבר על מנת לצפות בדף זה');
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated && <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ clientStatus: { isAuthenticated } }) => ({
    isAuthenticated
  });
  return connect(
    mapStateToProps,
    { setToast }
  )(ComposedComponent);
};
