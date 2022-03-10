import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from './Homepage';
import CompanyList from './CompanyList.js';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';


function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/companies/:name">
        <CompanyDetail />
      </Route>
      <Route exact path="/jobs">
        <JobList />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;