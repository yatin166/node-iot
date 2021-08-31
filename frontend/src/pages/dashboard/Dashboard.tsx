import React from 'react';
import { RouteComponentProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'
import { TimeSeriesChart } from '../../components/chart/TimeSeries/TimeSeriesChart';
import { Card } from '../../components/card/Card';
import { PrivateRoute } from '../../components/routes/PrivateRoute';
import { Path } from '../../components/routes/Path';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {
    
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Flex.Vertical>
                    <button onClick={() => props.history.push(`${Path.DASHBOARD}/${Path.TimeSeriesChart}`)}>abc</button>
                    <Card>
                        Time Series
                    </Card>
                    <Router>
                        <Switch>
                            <Route exact path={`/${Path.DASHBOARD}/${Path.TimeSeriesChart}`}>
                                <TimeSeriesChart />
                            </Route>
                        </Switch>
                    </Router>
                </Flex.Vertical>
            </div>
        </div>
    )
}