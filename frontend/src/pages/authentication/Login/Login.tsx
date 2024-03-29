import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LoginRequest } from '../../../dto/request/Login.request';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/button/Button';
import { Flex } from '../../../components/container/flex/Flex';
import styles from './Login.module.scss'
import { ServicesContext } from '../../../context/ApiServices.context';
import { Path } from '../../../components/routes/Path';

interface State {
    email: string
    password: string
}

interface Props extends RouteComponentProps<{}> {}

export const Login: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {
    

    const service = useContext(ServicesContext);
    const [credentials, setCredentials] = useState<State>({ email: '', password: '' });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        if (!credentials.email || !credentials.password)
            alert('Please provide valid email and password');
        const loginRequest: LoginRequest = {
            email: credentials.email,
            password: credentials.password
        }
        service.authenticationApi.login(loginRequest)
            .then(() => history.push(Path.DASHBOARD))
            .catch(error => console.error(error))
    }
    
    return (
        <div className={styles.formContainer}>
            <Flex.Vertical width={'25vw'}>
                <form onSubmit={onSubmit}>
                    <Input
                        type='email'
                        label='Email'
                        name='email'
                        onChange={(e) => handleOnChange(e)}
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
