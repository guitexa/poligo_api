import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignInMail from '../pages/SignInMail';
import SignInPassword from '../pages/SignInPassword';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignInMail} />
    <Route path="/Login" component={SignInPassword} isMailFilled />
    <Route path="/SignUp" component={SignUp} />

    <Route path="/Dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
