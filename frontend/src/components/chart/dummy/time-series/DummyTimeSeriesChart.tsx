import { Box } from '@mui/material';
import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './DummyTimeSeriesChart.module.scss'

interface Props {}

export const DummyTimeSeriesChart: React.FunctionComponent<Props>  = (): JSX.Element => {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [20, 90, 40, 60, 100, 60],
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

    return (
        <Box className={styles.chartContainer}>
            <Line data={data} options={chartOptions}/>
        </Box>
    )
}