import asyncComponent from '@util/asyncComponent';
import { Route, Switch } from 'react-router-dom';

function Working({ match }) {
  return (
    <Switch>
      <Route
        path={`${match.url}/project`}
        component={asyncComponent(() => import('./Project'))}
      />
      <Route
        path={`${match.url}/project/:id`}
        component={asyncComponent(() => import('./Project/DetailProject'))}
      />
      <Route
        path={`${match.url}/personal`}
        component={asyncComponent(() => import('./Project/DetailProject'))}
      />
      <Route
        path={`${match.url}/setting/status-project`}
        component={asyncComponent(() => import('./Setting/StatusProject'))}
      />
      <Route
        path={`${match.url}/statistic`}
        component={asyncComponent(() => import('./Statistic'))}
      />
      <Route
        path={`${match.url}/setting/personal-work-level`}
        component={asyncComponent(() => import('./Setting/PersonalityLevel'))}
      />
    </Switch>
  );
}

export default Working;
