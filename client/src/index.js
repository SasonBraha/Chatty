import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from "./resources/registerServiceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux';
import history from './resources/history';
import store from './redux/store';
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('appMount')
);

registerServiceWorker();
