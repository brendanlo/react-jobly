import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from './Homepage';
import CompanyList from './CompanyList.js';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm.js';
import ProfileForm from './ProfileForm';



function Routes({ logInUser, createUserAndAuth, changeUserData }) {
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
      <Route exact path="/login">
        <LoginForm logInUser={logInUser} />
      </Route>
      <Route exact path="/signup">
        <SignupForm createUserAndAuth={createUserAndAuth} />
      </Route>
      <Route exact path="/profile">
        <ProfileForm changeUserData={changeUserData} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;