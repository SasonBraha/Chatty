import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from "./utils/registerServiceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux';
import history from './resources/history';
import store from './redux/store';
import App from "./containers/App";
import ErrorBoundry from './components/ErrorBoundry';
import './base.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorBoundry>
        <App />
      </ErrorBoundry>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('reactMount')
);

registerServiceWorker();
