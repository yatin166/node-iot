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
    const [yAxisData, setYAxisData] = useState<Date[]>([new Date(), new Date(), new Date(), new Date(), new Date()])

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

    const data = {
        datasets: [
          {
            label: 'A dataset',
            data: [
                socketData.map((s, i) => { return { x: s, y: yAxisData[i] } })
            ],
            borderColor: "#742774"
          }
        ]
    };

    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
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

    console.log(socketData, 'socketData')
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