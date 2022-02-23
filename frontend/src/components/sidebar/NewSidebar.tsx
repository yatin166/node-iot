import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Flex } from '../../components/container/flex/Flex'
import { Card } from '../../components/card/Card';
import { Path } from '../../components/routes/Path';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { CssBaseline } from '@mui/material';
import { Header } from '../header/Header';

interface Props extends RouteComponentProps<{}> {}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const NewSidebar: React.FunctionComponent<Props>  = ({ history }): JSX.Element => {

    const [toggle, setOpen] = React.useState(false);

    const toggleDrawer = () => setOpen(!toggle);

    return (
      <Drawer variant="permanent" open={toggle}>
          <DrawerHeader />
          <List>
              <ListItem button key={'Dashboard'}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
              </ListItem>
          </List>
      </Drawer>
    )

    /* return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header drawerWidth={drawerWidth} toggleDrawer={toggleDrawer}/>
          <Drawer variant="permanent" open={toggle}>
            <DrawerHeader />
            <List>
                <ListItem button key={'Dashboard'}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
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
        </Box>
      ); */
}

export default withRouter(NewSidebar);