import React, { useEffect } from 'react';
import withRouter from 'react-router-dom/withRouter';
import { setUserCredentials, showConsoleWarning } from '../redux/actions';
import { connect } from 'react-redux';
import Routes from '../components/Routes';
import { Header, Nav } from './Layouts';
import Container from './Container';
import Toasts from './Toasts';

const App = ({ setUserCredentials, showConsoleWarning }) => {
  useEffect(() => {
    setUserCredentials();
    showConsoleWarning();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Nav />

      <Container>
        <Routes />
      </Container>

      <Toasts />
    </React.Fragment>
  );
};

export default withRouter(
  connect(
    null,
    { setUserCredentials, showConsoleWarning }
  )(App)
);
