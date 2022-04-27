import React from 'react';
import styles from './Button.module.scss'

interface Props {
    value: string;
    onClick: () => void
}

export const Button: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <button onClick={props.onClick} className={styles.button}>
            {props.value}
        </button>
    )
}