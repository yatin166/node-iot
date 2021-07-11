import React, { useState } from 'react';
import { RegisterRequest } from '../../../dto/request/Register.request';
import { Authentication } from '../../../services/Authentication.api';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/button/Button';
import { Flex } from '../../../components/container/flex/Flex';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Register.module.scss'

interface State {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
}

interface Props extends RouteComponentProps<{}> {}

export const Register: React.FunctionComponent<Props> = (props: Props): JSX.Element => {

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
        <div className={styles.formContainer}>
            <Flex.Vertical justifyContent='center' alignItems='center'>
                <form onSubmit={onSubmit}>
                    <Flex.Horizontal>
                        <Input
                            type='text'
                            label='First name'
                            name='firstName'
                            onChange={handleOnChange}
                            value={credentials.firstName} />
                        <Input
                            type='text'
                            label='Last name'
                            name='lastName'
                            onChange={handleOnChange}
                            value={credentials.lastName} />
                    </Flex.Horizontal>
                    <Flex.Horizontal width='100%'>
                        <div className={styles.formEmailInput}>
                            <Input
                                type='email'
                                label='Email'
                                name='email'
                                onChange={handleOnChange}
                                value={credentials.email} />
                        </div>
                    </Flex.Horizontal>
                    <Flex.Horizontal>
                        <Input
                            type='password'
                            label='Password'
                            name='password'
                            onChange={handleOnChange}
                            value={credentials.password} />
                        <Input
                            type='password'
                            label='Confirm password'
                            name='confirmPassword'
                            onChange={handleOnChange}
                            value={credentials.confirmPassword} />
                    </Flex.Horizontal>
                    <Button value='Register' onClick={() => {return}}/>
                <Button value='Login' onClick={() => props.history.push('/')}/>
                </form>
            </Flex.Vertical>
        </div>
    )
}
