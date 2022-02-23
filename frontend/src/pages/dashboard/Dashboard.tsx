import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Flex } from '../../components/container/flex/Flex'
import styles from './Dashboard.module.scss'
import { Card } from '../../components/card/Card';
import { Path } from '../../components/routes/Path';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, CssBaseline, Divider, IconButton } from '@mui/material';
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