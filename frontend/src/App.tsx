import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { ApiServicesContext } from './context/ApiServices.context';
import { Login } from './pages/authentication/login/Login';
import { Register } from './pages/authentication/register/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Authentication } from './services/Authentication.api'
import { Admin } from './services/Admin.api'

interface Props { }

interface State { }

export class App extends React.Component<Props, State> {

    render() {
        return (
            <Router>
                <Switch>
                    
                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        )
    }
}
