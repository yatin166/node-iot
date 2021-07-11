import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Login } from './pages/authentication/Login/Login';
import { Register } from './pages/authentication/Register';

interface Props { }

interface State { }

export class App extends React.Component<Props, State> {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Router>
        )
    }
}
