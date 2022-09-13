import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import 'assets/vendors/style';
import 'styles/index.less';

import { store, history } from './appRedux/store';
import App from './containers/App/index';
import { AuthProvider } from './authentication';

const NextApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AuthProvider>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </AuthProvider>
    </ConnectedRouter>
  </Provider>
);

export default NextApp;
