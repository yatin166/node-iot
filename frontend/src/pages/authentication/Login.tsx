import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LoginRequest } from '../../dto/request/Login.request';
import { Authentication } from '../../services/Authentication.api';

interface State {
    email: string
    password: string
}

interface Props extends RouteComponentProps<{}> {}

export const Login: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {

    const [credentials, setCredentials] = useState<State>({ email: '', password: '' });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setCredentials({ email: value, password: credentials.password })
                break;
            case 'password':
                setCredentials({ email: credentials.email, password: value })
                break;
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        const authentication = new Authentication();
        const loginRequest: LoginRequest = {
            email: credentials.email,
            password: credentials.password
        }
        const login = authentication.login(loginRequest)
            .then(() => console.log('Logged in'))
            .catch(error => console.error(error))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                Email:
                <input type='email' name='email' value={credentials.email} onChange={handleOnChange} />
                Password:
                <input type='password' name='password' value={credentials.password} onChange={handleOnChange} />
                <button>Submit</button>
                Login UI
            </form>
            <button onClick={() => history.push('/register')}>Register</button>
        </div>
    )
}
