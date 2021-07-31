import React from 'react';
import styles from './Icon.module.scss'

interface Props {}

export const Icon: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div className={styles.iconContainer} />
    )
}