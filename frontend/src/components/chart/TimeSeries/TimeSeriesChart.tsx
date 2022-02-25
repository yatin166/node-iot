import React, { useContext } from 'react';
import styles from './TimeSeriesChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { LocalStorage } from '../../../storage/LocalStorage';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {}

export const TimeSeriesChart: React.FunctionComponent<Props>  = (): JSX.Element => {

    const service = useContext(ServicesContext);
    const [socketData, setSocketData] = useState<number[]>([]);

    useEffect(() => {
        const timeSeriesSocket = service.socketService.getTimeSeriesSocket();
        const userId = LocalStorage.getUserId();
        if (userId) {
            timeSeriesSocket.on(userId, message => {
                setSocketData(prevState => [...prevState.slice(-5), message]);
            });
        }
    }, [])

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [...socketData],
            fill: false,
            borderColor: 'white'
          }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                ticks: {
                  color: 'white'
                }
            },
            x: {
                ticks: {
                    color: 'white'
                }
            },
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
        /* <div className={styles.timeSeriesChartContainer}>
            <div className={styles.actionButtonContainer}>
                <Button onClick={emitData} sx={{ backgroundColor: '#263042', marginRight: '24px' }}>
                    EMIT
                </Button>
                <Button onClick={disconnect} sx={{ backgroundColor: '#263042' }}>
                    STOP
                </Button>
            </div>
            <Line data={data} options={chartOptions}/>
        </div> */
        /* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={emitData} sx={{ backgroundColor: '#263042', marginRight: '24px' }}>
                EMIT
            </Button>
            <Button onClick={disconnect} sx={{ backgroundColor: '#263042' }}>
                STOP
            </Button>
            <Line data={data} options={chartOptions}/>
        </Box> */
        <Card sx={{ width: '60vw', height: '60vh', backgroundColor: '#263042' }}>
            <CardContent className={styles.cardContentContainer}>
                <div className={styles.timeSeriesChartContainer}>
                    <Line data={data} options={chartOptions}/>
                </div>
            </CardContent>
            <CardActions>
                <Button size='large' onClick={emitData} sx={{ backgroundColor: '#263042' }}>
                    EMIT
                </Button>
                <Button size='large' onClick={disconnect} sx={{ backgroundColor: '#263042' }}>
                    STOP
                </Button>
            </CardActions>
        </Card>
    )
}