import {
    Route,
    Redirect
} from 'react-router-dom';

export const AuthRoute = ({ component: Component, ...rest }: any) => {

    const isAuthenticated: boolean = true;

    return (
        <Route
          {...rest}
          render={props => isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/' />} />
    );
}