import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';
import { setUserCredentials, showConsoleWarning } from '../redux/actions';
import { connect } from 'react-redux';
import Routes from '../components/Routes';
import { Header, Nav } from './Layouts';
import Container from './Container';
import Toasts from './Toasts';

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
        </Container>

        <Toasts />
      </>
    );
  }
}

export default withRouter(
  connect(
    null,
    { setUserCredentials, showConsoleWarning }
  )(App)
);
