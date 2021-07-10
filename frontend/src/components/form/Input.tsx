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
            <label>{props.label}</label>
            <input type={props.type} name={props.name} value={props.value} onChange={props.onChange} />
        </div>
    )
}
