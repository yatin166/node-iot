import React from 'react';
import styles from './Card.module.scss'

interface Props {
    children: React.ReactNode
    onClick?: () => void
}

export const Card: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div className={styles.cardContainer} onClick={props.onClick}>
            {props.children}
        </div>
    )
}