import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import WalletIcon from '@mui/icons-material/Wallet';
import LogoutIcon from '@mui/icons-material/Logout';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton href="/wallet">
      <ListItemIcon>
        <WalletIcon />
      </ListItemIcon>
      <ListItemText primary="Wallet" />
    </ListItemButton>
    <ListItemButton href="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton href="/login">
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
);
