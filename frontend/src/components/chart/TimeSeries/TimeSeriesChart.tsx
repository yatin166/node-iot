import React, { useContext } from 'react';
import styles from './TimeSeriesChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';

interface Props {}

export const TimeSeriesChart: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const apiServicesContext = useContext(ServicesContext);
    const [socketData, setSocketData] = useState<number[]>([]);

    useEffect(() => {
        const timeSeriesSocket = apiServicesContext.socketService.getTimeSeriesSocket();
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
    
    return (
        <div className={styles.timeSeriesChartContainer}>
            <Line data={data} options={chartOptions}/>
        </div>
    )
}