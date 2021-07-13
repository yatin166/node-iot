import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import styles from './Dashboard.module.scss'

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            Dashboard
        </div>
    )
}