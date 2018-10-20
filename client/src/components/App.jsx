import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';
import { setUserCredentials, showConsoleWarning } from '../redux/actions';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Header, Nav } from './Layouts';
import Container from './Container';
import Toasts from './Toasts';
import './Ui/theme/globalStyle';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setUserCredentials();
    this.props.showConsoleWarning();
  }

  render() {
    return (
      <>
        <Header />
        <Nav />
        <Container>
          <Routes />
          <Toasts />
        </Container>
      </>
    );
  }
}

export default withRouter(connect(null, { setUserCredentials, showConsoleWarning })(App));
