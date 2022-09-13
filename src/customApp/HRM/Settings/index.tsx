import asyncComponent from '@util/asyncComponent';
import { Route, Switch } from 'react-router-dom';

const Settings = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/organization-settings`}
      component={asyncComponent(() => import('./OrganizationSettings'))}
    />
    <Route
      path={`${match.url}/recruiment-settings`}
      component={asyncComponent(() => import('./RecruimentSettings'))}
    />
    <Route
      path={`${match.url}/asset-settings`}
      component={asyncComponent(() => import('./AssetSettings'))}
    />
    <Route
      path={`${match.url}/code-settings`}
      component={asyncComponent(() => import('./CodeSettings'))}
    />
    <Route
      path={`${match.url}/role`}
      component={asyncComponent(() => import('../ManagePerson/index'))}
    />
  </Switch>
);

export default Settings;
