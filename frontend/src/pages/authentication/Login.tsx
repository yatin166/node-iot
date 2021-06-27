import React, { useState } from 'react';

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

    const onSubmit = () => {
        console.log(credentials)
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
