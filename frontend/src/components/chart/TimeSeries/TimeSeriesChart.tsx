import React, { useContext } from 'react';
import styles from './TimeSeriesChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { LocalStorage } from '../../../storage/LocalStorage';
import { Box, Button, Card, CardActions, CardContent } from '@mui/material';

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
        <Box>
            <Card sx={{ width: '60vw', backgroundColor: '#263042', marginBottom: '1em' }}>
                <CardContent className={styles.cardContentContainer}>
                <Line data={data} options={chartOptions}/>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            <Button size='large' onClick={emitData} sx={{ backgroundColor: '#263042', marginRight: '1em' }}>
                EMIT
            </Button>
            <Button size='large' onClick={disconnect} sx={{ backgroundColor: '#263042' }}>
                STOP
            </Button>
        </Box>
    )
}