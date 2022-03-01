import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
import { Path } from '../routes/Path';

interface Props extends RouteComponentProps<{}> {
  content: JSX.Element
}

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    '& > div': {
        backgroundColor: '#263042',
    }
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
    '& > div': {
        backgroundColor: '#263042',
    }
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

const Sidebar: React.FunctionComponent<Props>  = ({ history, content }): JSX.Element => {

    const [toggle, setOpen] = React.useState(false);

    const toggleDrawer = () => setOpen(!toggle);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <CssBaseline />
          <Header drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} open={toggle}/>
          <Drawer variant="permanent" open={true}>
            <DrawerHeader />
            <List>
                <ListItem button key={'Dashboard'} onClick={() => history.push(`/${Path.DASHBOARD}`)}>
                    <ListItemIcon>
                      <HomeIcon sx={{ fontSize: 32, color: 'white' }}/>
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white' }} primary={'Dashboard'} />
                </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#1d2634', width: '100%' }}>
              <DrawerHeader />
              {content}
          </Box>
        </Box>
      );
}

export default withRouter(Sidebar);