import {
    Route,
    Redirect
} from 'react-router-dom';
import { LocalStorage } from '../../storage/LocalStorage';
import atob from 'atob';

export const AuthRoute = ({ component: Component, ...rest }: any) => {

    const isAuthenticated: boolean = true;

    const checkRefreshTokenValidity = () => {
        const refreshToken = LocalStorage.getRefreshToken()
        if (!refreshToken)
            return

        const refreshToeknPayload = JSON.parse(atob(refreshToken));
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