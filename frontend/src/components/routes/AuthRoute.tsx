import {
    Route,
    Redirect
} from 'react-router-dom';
import { LocalStorage } from '../../storage/LocalStorage';
import atob from 'atob';

export const AuthRoute = ({ component: Component, ...rest }: any) => {

    let isAuthenticated: boolean = false;

    const refreshToken = LocalStorage.getRefreshToken()
    if (!refreshToken)
        isAuthenticated = false;
    else {
        const refreshToeknPayload: { iat: number, exp: number } = JSON.parse(atob(refreshToken.split('.')[1]));
        const now = new Date();
        console.log(new Date(refreshToeknPayload.exp).toString(), refreshToeknPayload.exp, 'exp')
        console.log(new Date(now.getTime() / 1000).toString(), now.getTime() / 1000, 'now')

        console.log(refreshToeknPayload.exp < (now.getTime() / 1000))
        if (refreshToeknPayload.exp < (now.getTime() / 1000)) {
            console.log('token is invalid and should be logged out');
        }
        console.log(refreshToeknPayload, 'refreshToeknPayload')
    }

    return (
        <Route
          {...rest}
          render={props => isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/' />} />
    );
}