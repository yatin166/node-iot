import React, { useContext } from 'react';
import styles from './TimeSeriesChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { Button } from '../../button/Button';
import { Socket } from 'socket.io-client';

interface Props {}

export const TimeSeriesChart: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const service = useContext(ServicesContext);
    const [socketData, setSocketData] = useState<number[]>([]);
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const timeSeriesSocket = service.socketService.getTimeSeriesSocket();
        //setSocket(timeSeriesSocket);
        timeSeriesSocket.on('dataForClient', message => {
            setSocketData(prevState => [...prevState, message]);
        });
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
        const timeSeriesSocket = service.socketService.getTimeSeriesSocket();
        const MAX = 100;
        const MIN = 10;
        setInterval(() => timeSeriesSocket?.emit('dataFromServer', Math.floor(Math.random() * (MAX - MIN + 1) + MIN)), 2000);
        setSocket(timeSeriesSocket);
        /* fetch('http://localhost:8001/api/v1/data/time-series')
            .then((res) => res.json())
            .then(response => console.log(response))
            .catch(error => console.error(error)) */
    }

    const disconnect = () => {
        socket?.disconnect();
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