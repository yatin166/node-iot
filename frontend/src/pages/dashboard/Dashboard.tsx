import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';

interface Props extends RouteComponentProps<{}> {}

export const Dashboard: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    return (
        <div>
            <Sidebar />
            Dashboard
        </div>
    )
}