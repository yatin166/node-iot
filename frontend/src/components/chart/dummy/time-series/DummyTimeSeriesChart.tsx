import React from 'react';
import { Line } from 'react-chartjs-2';

interface Props {}

export const DummyTimeSeriesChart: React.FunctionComponent<Props>  = (): JSX.Element => {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [10, 30, 20, 60, 100, 90],
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

    return <Line data={data} options={chartOptions}/>
}