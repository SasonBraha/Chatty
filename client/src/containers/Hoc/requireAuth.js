import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToast } from '../../redux/actions';
import { SIGN_IN_URL } from '../../resources/constants';
import { REDIRECTED_FROM_QS } from '../../utils/config';

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
        history.push(`${SIGN_IN_URL}?${REDIRECTED_FROM_QS}=${this.props.location.pathname}`);
        setToast('עליך להתחבר על מנת לצפות בדף זה', 'error');
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated && <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
    isAuthenticated
  });
  return connect(
    mapStateToProps,
    { setToast }
  )(ComposedComponent);
};
