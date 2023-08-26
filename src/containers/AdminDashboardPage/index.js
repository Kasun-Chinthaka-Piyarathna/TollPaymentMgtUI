import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

import { getAllUsers, getAllUsersRides, updateUserWallet } from "src/api/user.service";

import RidesTable from './RidesTable';
import UsersTable from './UsersTable';
import UpdateWalletDialog from './UpdateWalletDialog';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        NeO Web Solutions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function AdminDashboardPage() {

  const [userLoading, setUserLoading] = useState(true);
  const [ridesLoading, setRidesLoading] = useState(true);
  const [allRides, setAllRides] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectUserProfile, setSelectUserProfile] = useState({});
  const [selectVehicle, setSelectVehicle] = useState(null);
  const [newPayment, SetNewPayment] = useState(null);
  const [message, setMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openUpdateWalletDialog, setOpenUpdateWalletDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const { id: currentUserId, username: currentUsername } = user;
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(res => {
      if (res != null) {
        const { status, message, data } = res.data;
        if (status === "Success") {
          setUserLoading(false);
          setAllUsers(data);
          setMessage(message);
          setSnackbarOpen(true);
        } else { }
        setUserLoading(false);
      }
    });
    getAllUsersRides().then(res => {
      if (res != null) {
        const { status, message, data } = res.data;
        if (status === "Success") {
          setRidesLoading(false);
          setAllRides(data);
          setMessage(message);
          setSnackbarOpen(true);
        } else {
          setRidesLoading(false);
        }
      }
    });

  }, [currentUserId, refresh]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const handleCloseUpdateWallet = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setOpenUpdateWalletDialog(false);
  };

  const handleWalletUpdate = async () => {
    setUserLoading(true);
    const { wallet, id } = selectUserProfile;
    let updatedWalletBalance = wallet + parseFloat(newPayment);
    let res = await updateUserWallet(id, updatedWalletBalance);
    if (res != null) {
      const { status, message } = res.data;
      if (status === "Success") {
        setMessage(message);
        setSnackbarOpen(true);
        setUserLoading(false);
        setOpenUpdateWalletDialog(false);
        setRefresh(!refresh);
      } else {
        setOpenUpdateWalletDialog(false);
        setUserLoading(false);
      }
    }
  };

  const openWallet = (rowIndex) => {
    setSelectUserProfile(allUsers[rowIndex]);
    const { vehiclenumber } = allUsers[rowIndex];
    setSelectVehicle(vehiclenumber);
    setOpenUpdateWalletDialog(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'block' }}>
          {snackbarOpen === true && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message={message}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              severity="success"
            />
          )}

          <UpdateWalletDialog
            open={openUpdateWalletDialog}
            handleClose={handleCloseUpdateWallet}
            handleWalletUpdate={handleWalletUpdate}
            SetNewPayment={SetNewPayment}
            newPayment={newPayment}
            selectVehicle={selectVehicle}
          />

          <CssBaseline />
          <div style={{ display: 'flex', minHeight: '64px', background: "rgb(50 160 90)", paddingLeft: "24px", paddingRight: "24px", alignItems: "center" }}>
            <Typography
              component="h1"
              variant="h6"
              color="#ffffff"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Toll Payment Management System
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography
                component="h1"
                variant="h6"
                color="#ffffff"
                style={{ display: 'flex', alignItems: "center" }}
              >
                Welcome back {currentUsername}
              </Typography>
              <Tooltip title="Log Out" style={{ marginLeft: "10px" }}>
                <IconButton onClick={logout}>
                  <LogoutIcon sx={{ color: "#ffffff" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {userLoading === true ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <UsersTable
                        rows={allUsers}
                        title="All users"
                        openWallet={openWallet}
                      />
                    )}
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {ridesLoading === true ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress color="secondary" />
                      </Box>
                    ) : (
                      <RidesTable
                        rows={allRides}
                        title="All rides"
                      />
                    )}
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box >
      </ThemeProvider >
    </LocalizationProvider >
  );
}