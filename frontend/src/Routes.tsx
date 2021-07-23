import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Login } from './pages/authentication/Login/Login';
import { Register } from './pages/authentication/register/Register';
import { Dashboard } from './pages/dashboard/Dashboard';

export const Routes = () => {
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
