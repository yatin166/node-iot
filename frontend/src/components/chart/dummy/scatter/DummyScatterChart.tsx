import React from 'react';
import styles from './DummyScatterChart.module.scss'
import { Scatter } from 'react-chartjs-2';
import { Box } from '@mui/material';

interface Props {}

export const DummyScatterChart: React.FunctionComponent<Props>  = (): JSX.Element => {

    const data = {
        datasets: [
          {
            data: [
                { x: 10, y: 0.2 },
                { x: 20, y: 0.4 },
                { x: 30, y: 0.1 },
                { x: 40, y: 0.6 },
                { x: 50, y: 0.3 },
                { x: 60, y: 0.8 },
                { x: 70, y: 0.7 },
                { x: 80, y: 0.2 },
                { x: 90, y: 0.6 },
                { x: 100, y: 0.5 }
            ],
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

    return (
        <Box className={styles.chartContainer}>
            <Scatter data={data} options={chartOptions}/>
        </Box>
    )
}