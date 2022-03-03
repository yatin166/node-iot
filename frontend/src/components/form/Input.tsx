import { TextField } from '@mui/material';
import React from 'react';
import styles from './Input.module.scss'

interface Props {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string;
}

export const Input: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div className={styles.inputContainer}>
            <TextField id="standard-basic" label={props.label} value={props.value} variant="standard" onChange={props.onChange} />
        </div>
    )
}
