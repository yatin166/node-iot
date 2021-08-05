import React from 'react';
import { Icon } from '../icon/Icon';
import styles from './Sidebar.module.scss'

interface Props {}

export const Sidebar: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

    const icons = [
        {
            icon: <Icon />,
            name: 'Time series',
            path: '/time-series'
        }
    ]
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.iconContainer}>
                {icons.map(item => {
                    return (
                        <div className={styles.icon}>
                            {item.icon}
                            <label>
                                {item.name}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}