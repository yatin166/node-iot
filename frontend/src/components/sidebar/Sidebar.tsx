import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LocalStorage } from '../../storage/LocalStorage';
import { Icon } from '../icon/Icon';
import { Path } from '../routes/Path';
import styles from './Sidebar.module.scss'

interface Props extends RouteComponentProps<{}> {}

const Sidebar: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {

    const onTimeSeriesClick = () => window.location.pathname = Path.DASHBOARD

    const logoutClick = () => {
        LocalStorage.destroy();
        history.push(Path.LOGIN);
    }

    const icons = [
        {
            icon: <Icon />,
            name: 'Time series',
            path: '/time-series',
            onClick: () => onTimeSeriesClick()
        },
        {
            icon: <Icon />,
            name: 'Logout',
            path: '/',
            onClick: () => logoutClick()
        }
    ]

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.iconContainer}>
                {icons.map(item => {
                    return (
                        <div className={styles.icon} onClick={() => item.onClick()}>
                            {item.icon}
                            <div>
                                {item.name}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default withRouter(Sidebar);