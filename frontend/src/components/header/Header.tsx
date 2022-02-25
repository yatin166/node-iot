import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalStorage } from '../../storage/LocalStorage';
import { AppBar } from '@mui/material';
import styles from './Header.module.scss';

interface Props extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
  toggleDrawer: () => void
}

export const Header: React.FunctionComponent<Props>  = (props: Props): JSX.Element => {

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: '#1d2634', boxShadow: 'none' }} className={styles.appBarContainer}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.toggleDrawer}
              edge="start">
              {props.open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => LocalStorage.destroy()}>LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </Box> 
  );
}