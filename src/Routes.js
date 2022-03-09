import React from 'react';
import { Route, Switch } from "react-router-dom";

import Homepage from './Homepage';
import CompanyList from './CompanyList.js';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';


function Routes() {
  // CR include redirect for no match
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
    </Switch>
  );
}

export default Routes;