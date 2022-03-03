import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Flex } from '../../components/container/flex/Flex';
import { Path } from '../../components/routes/Path';
import NewSidebar from '../../components/sidebar/Sidebar';
import { Card, CardContent } from '@mui/material';
import styles from './Dashboard.module.scss';
import { DummyTimeSeriesChart } from '../../components/chart/dummy/time-series/DummyTimeSeriesChart';
import { DummyScatterChart } from '../../components/chart/dummy/scatter/DummyScatterChart';
import { Box } from '@mui/material';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {
   
    const dashboardContent = (): JSX.Element => {
        const cssStyles = {
            width: '50%', 
            height: '40vh', 
            borderRadius: '0.5em', 
            backgroundColor: '#263042',
            cursor: 'pointer'
        }
      return (
          <Box className={styles.dashboardContainer}>
                <Card sx={cssStyles} className={styles.cardContainer} onClick={() => history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.TIME_SERIES_CHART}`)}>
                    <CardContent>
                        <DummyTimeSeriesChart />
                    </CardContent>
                </Card>

                <Card sx={cssStyles} className={styles.cardContainer} onClick={() => history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.SCATTER_CHART}`)}>
                    <CardContent>
                        <DummyScatterChart />
                    </CardContent>
                </Card>
          </Box>
      )
    }

  return (
      <NewSidebar content={dashboardContent()}/>
  )
}