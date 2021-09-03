import React from 'react';
import { RouteComponentProps, BrowserRouter, Switch, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './ChartRoutes.module.scss'
import { TimeSeriesChart } from '../../components/chart/TimeSeries/TimeSeriesChart';
import { Path } from '../../components/routes/Path';

interface Props extends RouteComponentProps<{}> {}

export const ChartRoutes: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {
    
    return (
        <div className={styles.chartsContainer}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Flex.Vertical>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path={`/${Path.DASHBOARD}/${Path.CHARTS}/${Path.TIME_SERIES_CHART}`}
                                component={TimeSeriesChart}/>
                        </Switch>
                    </BrowserRouter>
                </Flex.Vertical>
            </div>
        </div>
    )
}