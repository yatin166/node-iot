import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'
import { TimeSeriesChart } from '../../components/chart/TimeSeries/TimeSeriesChart';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {
    
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Flex.Vertical>
                    <TimeSeriesChart />
                </Flex.Vertical>
            </div>
        </div>
    )
}