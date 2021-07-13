import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Sidebar.module.scss'

interface Props {}

export const Sidebar: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div className={styles.sidebarContainer}>
            <ul>
                <li>
                    Home
                </li>
                <li>
                    Time series
                </li>
            </ul>
        </div>
    )
}