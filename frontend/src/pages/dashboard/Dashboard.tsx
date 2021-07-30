import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Line, Chart } from "react-chartjs-2";

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const [socketData, setSocketData] = useState<any>();

    useEffect(() => {
        const ioServer = io('http://localhost:8001/');
        setSocketData(ioServer);
    }, [])

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            data: [33, 25, 35, 51, 54, 76],
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
        <div className={styles.dashboardContainer}>
            <Sidebar />
            
            <Flex.Horizontal>
                <div className={styles.chartContainer}>
                    <Line data={data} options={chartOptions}/>
                </div>
            </Flex.Horizontal>
        </div>
    )
}