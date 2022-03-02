import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Flex } from '../../components/container/flex/Flex';
import { Path } from '../../components/routes/Path';
import NewSidebar from '../../components/sidebar/Sidebar';
import { Card, CardContent } from '@mui/material';
import styles from './Dashboard.module.scss';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {
   
    const dashboardContent = (): JSX.Element => {
      return (
        <Flex.Horizontal>
            <Card className={styles.cardContainer} onClick={() => history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.TIME_SERIES_CHART}`)}>
                <CardContent>
                    Time series chart
                </CardContent>
            </Card>

            <Card className={styles.cardContainer} onClick={() => history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.SCATTER_CHART}`)}>
                <CardContent>
                    Scatter chart
                </CardContent>
            </Card>
        </Flex.Horizontal>
      )
    }

  return (
      <NewSidebar content={dashboardContent()}/>
  )
}