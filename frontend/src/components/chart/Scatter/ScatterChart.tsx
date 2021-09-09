import React, { useContext } from 'react';
import styles from './ScatterChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { Button } from '../../button/Button';
import { LocalStorage } from '../../../storage/LocalStorage';

interface Props {}

export const ScatterChart: React.FunctionComponent<Props>  = (): JSX.Element => {

    const service = useContext(ServicesContext);
    const [socketData, setSocketData] = useState<number[]>([]);
    const [yAxisData, setYAxisData] = useState<Date[]>([new Date()])

    useEffect(() => {
        const timeSeriesSocket = service.socketService.getTimeSeriesSocket();
        const userId = LocalStorage.getUserId();
        if (userId) {
            timeSeriesSocket.on(userId, message => {
                setSocketData(prevState => [...prevState.slice(-5), message]);
                setYAxisData(prevState => [...prevState.slice(-5), new Date()]);
            });
        }
    }, [])

    const dd = socketData.map((s, i) => { return { x: yAxisData[i], y: s } });

    const data = {
        datasets: [
          {
            data: dd,
            borderColor: "#742774"
          }
        ]
    };

    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                        steps: 10,
                        stepValue: 5,
                        max: 100 
                    },
                },
            ],
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const emitData = () => {
        service.dashboardApi.startEmitting()
            .then(response => console.log('Started emitting', response.data.message))
            .catch(console.error)
    }

    const disconnect = () => {
        service.dashboardApi.stopEmitting()
            .then(() => console.log('Stopped emitting'))
            .catch(console.error)
    }

    return (
        <div className={styles.scatterChartContainer}>
            <div className={styles.actionButtonContainer}>
                <Button onClick={emitData} value='Emit'/>
                <Button onClick={disconnect} value='Stop'/>
            </div>
            <Scatter data={data} options={chartOptions}/>
        </div>
    )
}