import { TextField } from '@mui/material';
import React from 'react';
import styles from './Input.module.scss'

interface Props {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    label: string;
}

export const Input: React.FunctionComponent<Props>  = ({ name, type, value, label, onChange }): JSX.Element => {

    return (
        <div className={styles.inputContainer}>
            <TextField
                id={name}
                name={name}
                type={type} 
                label={label} 
                autoComplete={value} 
                value={value} 
                variant="standard" 
                onChange={onChange} />
        </div>
    )
}
