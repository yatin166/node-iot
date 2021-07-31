import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'
import { TimeSeriesChart } from '../../components/chart/TimeSeries/TimeSeriesChart';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const emitData = () => {
        fetch('http://localhost:8001/api/v1/data/time-series')
            .then((res) => res.json())
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }
    
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />

            <Flex.Horizontal>
                <button onClick={emitData}>Emit</button>
                <TimeSeriesChart />
            </Flex.Horizontal>
        </div>
    )
}