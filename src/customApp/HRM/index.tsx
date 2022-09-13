import asyncComponent from '@util/asyncComponent';
import { Route, Switch } from 'react-router-dom';

const App = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/management-of-employee-list`}
      component={asyncComponent(() => import('./HRMManageAccount'))}
    />

    <Route
      path={`${match.url}/storage`}
      component={asyncComponent(() => import('./HRMManageAccount/Storage'))}
    />

    <Route
      path={`${match.url}/settings`}
      component={asyncComponent(() => import('./Settings'))}
    />
  </Switch>
);

export default App;
