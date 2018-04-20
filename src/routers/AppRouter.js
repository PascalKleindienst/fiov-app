// ==============================================
// APP ROUTER ===================================
// ==============================================
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import DashboardPage from '../components/DashboardPage';
import AddTransactionPage from '../components/AddTransactionPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute path="/" component={HomePage} exact={true} />
            <PublicRoute path="/login" component={LoginPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/add" component={AddTransactionPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
);

export default AppRouter;
