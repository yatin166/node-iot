import React, { useContext } from 'react';
import styles from './ScatterChart.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { ServicesContext } from '../../../context/ApiServices.context';
import { LocalStorage } from '../../../storage/LocalStorage';
import { Box, Card, CardContent, CardActions, Button } from '@mui/material';

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

    const scatteredSocketData = socketData.map((s, i) => { return { x: yAxisData[i], y: s } });

    const data = {
        datasets: [
          {
            data: scatteredSocketData,
            borderColor: "white"
          }
        ]
    };

    const chartOptions = {
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
        /* <div className={styles.scatterChartContainer}>
            <div className={styles.actionButtonContainer}>
                <Button onClick={emitData} value='Emit'/>
                <Button onClick={disconnect} value='Stop'/>
            </div>
            <Scatter data={data} options={chartOptions}/>
        </div> */
        <Box>
            <Card sx={{ width: '60vw', backgroundColor: '#263042', marginBottom: '1em' }}>
                <CardContent className={styles.cardContentContainer}>
                    <Scatter data={data} options={chartOptions}/>
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