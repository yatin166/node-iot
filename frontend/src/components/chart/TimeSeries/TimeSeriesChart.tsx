import React, { useContext } from 'react';
import styles from './TimeSeriesChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { Button } from '../../button/Button';
import { Socket } from 'socket.io-client';
import { LocalStorage } from '../../../storage/LocalStorage';

interface Props {}

export const TimeSeriesChart: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const service = useContext(ServicesContext);
    const [socketData, setSocketData] = useState<number[]>([]);
    const [emmitingSocket, setSocket] = useState<Socket>();

    useEffect(() => {
        const timeSeriesSocket = service.socketService.getTimeSeriesSocket();
        const refreshToken = LocalStorage.getRefreshToken();
        if (refreshToken) {
            const refreshTokenPayload: { userId: string } = JSON.parse(atob(refreshToken.split('.')[1]));
            console.log(refreshTokenPayload.userId)

            timeSeriesSocket.on(refreshTokenPayload.userId, message => {
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
        service.dashboardApi.emitData()
            .then(() => {
                /* const emmitingSocket = service.socketService.getTimeSeriesSocket();
                const MAX = 100;
                const MIN = 10;
                setInterval(() => emmitingSocket?.emit('dataForServer', Math.floor(Math.random() * (MAX - MIN + 1) + MIN)), 2000);
                setSocket(emmitingSocket); */
            })
            .catch(console.error)
    }

    const disconnect = () => {
        emmitingSocket?.disconnect();
    }

    return (
        <div className={styles.timeSeriesChartContainer}>
            <div className={styles.actionButtonContainer}>
                <Button onClick={emitData} value='Emit'/>
                <Button onClick={disconnect} value='Stop'/>
            </div>
            <Line data={data} options={chartOptions}/>
        </div>
    )
}