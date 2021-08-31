import React, { useContext } from 'react';
import styles from './TimeSeriesChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { Button } from '../../button/Button';
import { LocalStorage } from '../../../storage/LocalStorage';
import { Card } from '../../card/Card';

interface Props {}

export const TimeSeriesChart: React.FunctionComponent<Props>  = (): JSX.Element => {

    const service = useContext(ServicesContext);
    const [socketData, setSocketData] = useState<number[]>([]);

    useEffect(() => {
        const timeSeriesSocket = service.socketService.getTimeSeriesSocket();
        const userId = LocalStorage.getUserId();
        if (userId) {
            timeSeriesSocket.on(userId, message => {
                setSocketData(prevState => [...prevState, message]);
            });
        }
    }, [])

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [...socketData],
            fill: false,
            borderColor: "#742774"
          }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const emitData = () => {
        service.dashboardApi.startEmitting()
            .then(() => console.log('Started emitting'))
            .catch(console.error)
    }

    const disconnect = () => {
        service.dashboardApi.stopEmitting()
            .then(() => console.log('Stopped emitting'))
            .catch(console.error)
    }

    return (
        <Card>
            <div className={styles.timeSeriesChartContainer}>
                <div className={styles.actionButtonContainer}>
                    <Button onClick={emitData} value='Emit'/>
                    <Button onClick={disconnect} value='Stop'/>
                </div>
                <Line data={data} options={chartOptions}/>
            </div>
        </Card>
    )
}