import {
    Route,
    Redirect
} from 'react-router-dom';
import { LocalStorage } from '../../storage/LocalStorage';
import atob from 'atob';
import { Path } from './Path';

export const AuthRoute = ({ component: Component, ...rest }: any) => {

    const isAuthenticated = (): boolean => {
        const refreshToken = LocalStorage.getRefreshToken()

        if (!refreshToken)
            return false;

        const refreshToeknPayload: { iat: number, exp: number } = JSON.parse(atob(refreshToken.split('.')[1]));
        const now = parseInt((new Date().getTime() / 1000).toString(), 10);

        if (refreshToeknPayload.exp < now) 
            return false;
            
        return true;
    }

    return (
        <Route
          {...rest}
          render={props => isAuthenticated()
            ? <Component {...props} />
            : <Redirect to={Path.LOGIN} />} />
    );
}