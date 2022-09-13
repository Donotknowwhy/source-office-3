import asyncComponent from '@util/asyncComponent';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function index({ match }) {
  return (
    <Switch>
      <Route
        path={`${match.url}/manage-data`}
        component={asyncComponent(() => import('./ManageData'))}
      />
      <Route
        path={`${match.url}/manage-customer`}
        component={asyncComponent(() => import('./ManageCustomer'))}
      />

      <Route
        path={`${match.url}/quote`}
        component={asyncComponent(() => import('./Quote'))}
      />
      <Route
        path={`${match.url}/manage-contract`}
        component={asyncComponent(() => import('./ManageContract'))}
      />
      <Route
        path={`${match.url}/category-service`}
        component={asyncComponent(() => import('./ListOfProductAndService'))}
      />
    </Switch>
  );
}

export default index;
