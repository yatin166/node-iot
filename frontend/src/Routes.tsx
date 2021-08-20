import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { AuthRoute } from './components/routes/AuthRoute';
import { Path } from './components/routes/Path';
import { Login } from './pages/authentication/Login/Login';
import { Register } from './pages/authentication/register/Register';
import { Dashboard } from './pages/dashboard/Dashboard';

export const Routes = () => {

    return (
        <Router>
            <Switch>
                <AuthRoute
                    exact
                    path={`/${Path.DASHBOARD}`}
                    component={Dashboard}/>
                <Route
                    exact
                    path={`/${Path.REGISTER}`}
                    component={Register} />
                <Route
                    exact
                    path={[`/${Path.REDIRECT}`, `/${Path.LOGIN}`]}
                    component={Login} />
            </Switch>
        </Router>
    )
}
