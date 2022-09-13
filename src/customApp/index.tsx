import { Route, Switch } from 'react-router-dom';
import asyncComponent from '../util/asyncComponent';

const App = ({ match }) => (
  <div className="gx-main-content-wrapper gx-pt-4">
    <Switch>
      <Route
        path={`${match.url}todo`}
        component={asyncComponent(() => import('./Working'))}
      />
      <Route
        path={`${match.url}hrm`}
        component={asyncComponent(() => import('./HRM'))}
      />
      <Route
        path={`${match.url}crm`}
        component={asyncComponent(() => import('./Crm'))}
      />
      <Route
        path={`${match.url}acm`}
        component={asyncComponent(() => import('./Acm'))}
      />
      <Route
        path={`${match.url}insight`}
        component={asyncComponent(() => import('./Insight'))}
      />
    </Switch>
  </div>
);

export default App;
