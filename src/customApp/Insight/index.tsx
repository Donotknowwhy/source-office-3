import asyncComponent from '@util/asyncComponent';
import { Route, Switch } from 'react-router-dom';

const App = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/income-statements`}
      component={asyncComponent(() => import('./IncomeStatements'))}
    />

    <Route
      path={`${match.url}/expense-report`}
      component={asyncComponent(() => import('./ExpenseReport'))}
    />

    <Route
      path={`${match.url}/cashflow-statement`}
      component={asyncComponent(() => import('./CashflowStatement'))}
    />
    <Route
      path={`${match.url}/inventory-report`}
      component={asyncComponent(() => import('./InventoryReport'))}
    />
    <Route
      path={`${match.url}/contract-report`}
      component={asyncComponent(() => import('./ContractReport'))}
    />
  </Switch>
);

export default App;
