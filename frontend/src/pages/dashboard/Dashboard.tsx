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

    const [socketData, setSocketData] = useState<number[]>([]);

    /* useEffect(() => {
        const ioServer = io('http://localhost:8001/');
        //setSocketData(ioServer);
        ioServer.on('dataFromServer', (data) => {
            console.log(data)
        });
    }, []) */
    //console.log(socketData, 'socketData')

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
        fetch('http://localhost:8001/api/v1/data/time-series')
            .then((res) => res.json())
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }

    const connect = () => {
        const socketServer = io('http://localhost:8001/');
        socketServer.on('dataForClient', message => {
            //console.log(message, 'message')
            //const lastFiveElements = socketData.splice(-5)
            console.log(socketData, 'sockerData', message, 'msg')
            setSocketData([...socketData, message]);
        });
    }
    
    
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            
            <Flex.Horizontal>
                <button onClick={connect}>Connect</button>
                <button onClick={emitData}>Emit</button>

                <div className={styles.chartContainer}>
                    <Line data={data} options={chartOptions}/>
                </div>
            </Flex.Horizontal>
        </div>
    )
}