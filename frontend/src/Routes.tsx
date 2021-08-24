import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { Path } from './components/routes/Path';
import { Login } from './pages/authentication/Login/Login';
import { Register } from './pages/authentication/register/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { PublicRoute } from './components/routes/PublicRoute';

export const Routes = () => {

    return (
        <Router>
            <Switch>
                <PrivateRoute
                    exact
                    path={`/${Path.DASHBOARD}`}
                    component={Dashboard}/>
                <PublicRoute
                    exact
                    path={`/${Path.REGISTER}`}
                    component={Register} />
                <PublicRoute
                    exact
                    path={[`/${Path.REDIRECT}`, `/${Path.LOGIN}`]}
                    component={Login} />
            </Switch>
        </Router>
    )
}
