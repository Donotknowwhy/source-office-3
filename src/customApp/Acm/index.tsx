import { Route, Switch } from 'react-router-dom';
import asyncComponent from '@util/asyncComponent';

function index({ match }) {
  return (
    <Switch>
      <Route
        path={`${match.url}/list-account`}
        component={asyncComponent(() => import('./ManageAccount/ListAccount'))}
      />
      <Route
        path={`${match.url}/storage`}
        component={asyncComponent(() => import('./ManageAccount/StorageAcm'))}
      />
      <Route
        path={`${match.url}/manage-revenue-expenditure`}
        component={asyncComponent(() => import('./ManageRevenueExpenditure'))}
      />
    </Switch>
  );
}

export default index;
