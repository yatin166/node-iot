import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Flex } from '../../components/container/flex/Flex'
import { Card } from '../../components/card/Card';
import { Path } from '../../components/routes/Path';
import NewSidebar from '../../components/sidebar/Sidebar';
import { Box } from '@mui/material';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {
   
    const dashboardContent = (): JSX.Element => {
      return (
        <Box sx={{ display: 'flex' }}>
            <Flex.Horizontal>
                <Card onClick={() => history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.TIME_SERIES_CHART}`)}>
                    <div >
                        Time series chart
                    </div>
                </Card>

                <Card onClick={() => history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.SCATTER_CHART}`)}>
                    <div>
                        Scatter chart
                    </div>
                </Card>
            </Flex.Horizontal>
        </Box>
      )
    }

  return (
      <NewSidebar content={dashboardContent()}/>
  )
}