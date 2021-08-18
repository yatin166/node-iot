import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LoginRequest } from '../../../dto/request/Login.request';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/button/Button';
import { Flex } from '../../../components/container/flex/Flex';
import styles from './Login.module.scss'
import { ServicesContext } from '../../../context/ApiServices.context';
import { LocalStorage } from '../../../storage/LocalStorage';

interface State {
    email: string
    password: string
}

interface Props extends RouteComponentProps<{}> {}

export const Login: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {
    

    const service = useContext(ServicesContext);
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
        const loginRequest: LoginRequest = {
            email: credentials.email,
            password: credentials.password
        }
        service.authenticationApi.login(loginRequest)
            .then(() => console.log('Logged in'))
            .catch(error => console.error(error))
    }

    const refreshToken = LocalStorage.getRefreshToken()
    if (refreshToken) {
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
        <div className={styles.formContainer}>
            <Flex.Vertical width={'25vw'}>
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
