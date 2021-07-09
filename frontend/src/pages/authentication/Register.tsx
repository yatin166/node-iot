import React, { useState } from 'react';
import { RegisterRequest } from '../../dto/request/Register.request';
import { Authentication } from '../../services/Authentication.api';

interface State {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
}

interface Props {}

export const Register: React.FunctionComponent<Props> = (): JSX.Element => {

    const [credentials, setCredentials] = useState<State>({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setCredentials({  ...credentials, email: value })
                break;
            case 'password':
                setCredentials({  ...credentials, password: value })
                break;
            case 'confirmPassword':
                setCredentials({  ...credentials, confirmPassword: value })
                break;
            case 'firstName':
                setCredentials({  ...credentials, firstName: value })
                break;
            case 'lastName':
                setCredentials({  ...credentials, lastName: value })
                break;
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        const authentication = new Authentication();
        const registerRequest: RegisterRequest = {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password
        }
        authentication.register(registerRequest)
            .then(() => console.log('Registered'))
            .catch(error => console.error(error))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                First name:
                <input type='text' name='firstName' value={credentials.firstName} onChange={handleOnChange} />
                Last name:
                <input type='text' name='lastName' value={credentials.lastName} onChange={handleOnChange} />
                Email:
                <input type='email' name='email' value={credentials.email} onChange={handleOnChange} />
                Password:
                <input type='password' name='password' value={credentials.password} onChange={handleOnChange} />
                Confirm password:
                <input type='password' name='confirmPassword' value={credentials.confirmPassword} onChange={handleOnChange} />
                <button>Submit</button>
                Register UI
            </form>
        </div>
    )
}
