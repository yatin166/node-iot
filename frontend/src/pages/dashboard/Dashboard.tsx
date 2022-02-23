import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Flex } from '../../components/container/flex/Flex'
import { Card } from '../../components/card/Card';
import { Path } from '../../components/routes/Path';
import NewSidebar from '../../components/sidebar/NewSidebar';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {
   
    /* return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Flex.Horizontal>
                    <Card onClick={() => props.history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.TIME_SERIES_CHART}`)}>
                        <div className={styles.cardContentContainer}>
                            Time series chart
                        </div>
                    </Card>

                    <Card onClick={() => props.history.push(`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.SCATTER_CHART}`)}>
                        <div className={styles.cardContentContainer}>
                            Scatter chart
                        </div>
                    </Card>
                </Flex.Horizontal>
            </div>
        </div>
    ) */
    const dashboardContent = (): JSX.Element => {
      return (
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
      )
    }

  return (
      <NewSidebar content={dashboardContent()}/>
  )
}