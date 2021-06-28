import React, { useState } from 'react';
import { LoginRequest } from '../../dto/request/Login.request';
import { Authentication } from '../../services/Authentication.api';

interface State {
    email: string
    password: string
}

export const Login = (): JSX.Element => {

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
        const login = authentication.login(loginRequest).then(() => console.log(credentials));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                Email:
                <input type='email' name='email' value={credentials.email} onChange={handleOnChange} />
                Email:
                <input type='password' name='password' value={credentials.password} onChange={handleOnChange} />
                <button>Submit</button>
                Login UI
            </form>
        </div>
    )
}
