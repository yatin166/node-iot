import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const [socketData, setSocketData] = useState<any>();

    useEffect(() => {
        const ioServer = io('http://localhost:8001/');
        setSocketData(ioServer);
    }, [])

    console.log(socketData, 'socket data')

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            
            <Flex.Horizontal>
                Dashboard
            </Flex.Horizontal>
        </div>
    )
}