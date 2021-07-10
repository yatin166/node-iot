import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LoginRequest } from '../../dto/request/Login.request';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/button/Button';
import { Flex } from '../../components/container/flex/Flex';
import { Authentication } from '../../services/Authentication.api';
import styles from './Login.module.scss'

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
        <div className={styles.formContainer}>
            <Flex.Vertical>
                <form onSubmit={onSubmit}>
                        <Input
                            type='email'
                            label='Email'
                            name='email'
                            onChange={handleOnChange}
                            value={credentials.email} />
                        <Input
                            type='password'
                            label='Password'
                            name='password'
                            onChange={handleOnChange}
                            value={credentials.password} />
                        <Button value='Login' onClick={() => {return}}/>
                </form>
                <Button value='Register' onClick={() => history.push('/register')}/>
            </Flex.Vertical>
        </div>
    )
}
