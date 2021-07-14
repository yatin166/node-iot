import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            
            <Flex.Horizontal>
                Dashboard
            </Flex.Horizontal>
        </div>
    )
}