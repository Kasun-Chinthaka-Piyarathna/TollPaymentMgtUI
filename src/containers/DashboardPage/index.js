import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import Snackbar from '@mui/material/Snackbar';

import { getAllRides, createRide, updateRide, getUser } from "src/api/user.service";

import Wallet from './Wallet';
import RidesTable from './RidesTable';
import PaymentReceiptDialog from './PaymentReceiptDialog';
import PaymentReportsDialog from './PaymentReportsDialog';



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

export default function DashboardPage() {

  const [entryTime, setEntryTime] = useState(null);
  const [exitTime, setExitTime] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [message, setMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openPaymentReceipt, setOpenPaymentReceipt] = useState(false);
  const [openPaymentReports, setOpenPaymentReports] = useState(false);
  const [selectedRideRecord, setSelectedRideRecord] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [weeklyRides, setWeeklyRides] = useState([]);
  const [weeklyDistance, setWeeklyDistance] = useState(0);
  const [weeklyPayment, setWeeklyPayment] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const { id: currentUserId, username: currentUsername } = user;
  const navigate = useNavigate();

  useEffect(() => {
    getAllRides(currentUserId).then(res => {
      if (res != null) {
        const { status, message, data } = res.data;
        if (status === "Success") {
          setLoading(false);
          setAllRides(data);
        } else {
          setLoading(false);
        }
      }
    });
    getUser(currentUserId).then(res => {
      if (res != null) {
        const { status, data } = res.data;
        if (status === "Success") {
          setWalletBalance(data.wallet);
        }
      }
    });
  }, [currentUserId, refresh]);

  const entryTimeChange = e => {
    const { target } = e;
    const { value } = target;
    setEntryTime(value);
  };


  const exitTimeChange = e => {
    const { target } = e;
    const { value } = target;
    const entryDateTime = new Date(entryTime);
    const exitDateTime = new Date(value);
    const dateTimeDifferenceInMiliSeconds = exitDateTime - entryDateTime;
    if (dateTimeDifferenceInMiliSeconds > 0) {
      setExitTime(value);
    } else {
      setExitTime('');
    }
  };

  const distanceChange = e => {
    const { target } = e;
    const { value } = target;
    setDistance(value);
  };

  const handlePaymentClick = rowIndex => {
    setSelectedRideRecord(allRides[rowIndex]);
    setOpenPaymentReceipt(true);
  }

  const handePayment = async () => {
    const { id, total_fee } = selectedRideRecord;
    const transaction_time = new Date();
    const payment = parseFloat(total_fee);
    let res = await updateRide(
      id,
      transaction_time,
      payment,
    );
    if (res != null) {
      setMessage("Payment is success!");
      setRefresh(!refresh);
    } else {
      setMessage("Something went wrong. Please try it again!");
    }
    setOpenPaymentReceipt(false);
  }

  const closePaymentReceipt = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpenPaymentReceipt(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const addRide = async () => {
    setLoading(true);
    const entryDateTime = new Date(entryTime);
    const exitDateTime = new Date(exitTime);
    const dateTimeDifferenceInMiliSeconds = exitDateTime - entryDateTime;
    const timeDifferenceInSeconds = dateTimeDifferenceInMiliSeconds / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
    const averageSpeed = distance / timeDifferenceInHours;
    const rideFee = distance * 10;
    let fineFee = 0;
    if (averageSpeed > 120) {
      fineFee = 500;
    }
    const totalFee = rideFee + fineFee;
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user;

    const user_id = id;
    const entry_time = entryTime;
    const exit_time = exitTime;
    const speed = averageSpeed;
    const ride_fee = rideFee;
    const fine = fineFee;
    const total_fee = totalFee;
    const start_balance = 0.00;
    const remaining_balance = 0.00;
    const transaction_time = "NOT YET";
    const transaction_status = "NOT YET";

    let res = await createRide(
      user_id,
      entry_time,
      exit_time,
      parseFloat(distance),
      speed,
      ride_fee,
      fine,
      total_fee,
      start_balance,
      remaining_balance,
      transaction_time,
      transaction_status
    );
    if (res != null) {
      setMessage("Ride added successfully!");
      setEntryTime("");
      setExitTime("");
      setDistance("");
    } else {
      setMessage("Something went wrong. Please try it again!");
    }
    setLoading(false);
    setSnackbarOpen(true);
    setRefresh(!refresh);
  };

  const handleViewReports = () => {
    let allRidesList = allRides;
    let ridesWithinWeek = [];
    let distance = 0;
    let payments = 0;
    for (let i = 0; i < allRidesList.length; i += 1) {
      let ride = allRidesList[i];
      let exitTime = ride.exit_time;
      var now = moment();
      var input = moment(exitTime);
      var isThisWeek = (now.isoWeek() === input.isoWeek())
      if (isThisWeek === true) {
        ridesWithinWeek.push(ride);
        distance += ride.distance;
        payments += ride.total_fee;
      }
    }
    setWeeklyRides(ridesWithinWeek);
    setWeeklyDistance(distance);
    setWeeklyPayment(payments);
    setOpenPaymentReports(true);
  }

  const closePaymentReports = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpenPaymentReports(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }
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
          <PaymentReceiptDialog
            open={openPaymentReceipt}
            handleClose={closePaymentReceipt}
            selectedRideRecord={selectedRideRecord}
            handePayment={handePayment}
          />
          <PaymentReportsDialog
            open={openPaymentReports}
            handleClose={closePaymentReports}
            weeklyRides={weeklyRides}
            weeklyDistance={weeklyDistance}
            weeklyPayment={weeklyPayment}
          />
          <CssBaseline />
          <div style={{ display: 'flex', minHeight: '64px', background: "#1976d2", paddingLeft: "24px", paddingRight: "24px", alignItems: "center" }}>
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
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                      justifyContent: 'center',
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="entryTime"
                          label="Entry Time"
                          type="datetime-local"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={entryTime}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          sx={{ width: 250 }}
                          onChange={entryTimeChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="exitTime"
                          label="Exit Time"
                          type="datetime-local"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={exitTime}
                          inputProps={{
                            step: 300,
                            min: entryTime
                          }}
                          sx={{ width: 250 }}
                          onChange={exitTimeChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          autoComplete="distance"
                          name="distance"
                          required
                          sx={{ width: 250 }}
                          id="distance"
                          label="Distance KMs"
                          autoFocus
                          type='number'
                          value={distance}
                          onChange={distanceChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <div style={{ display: 'flex' }} >
                          <Button
                            variant="contained"
                            disabled={
                              entryTime === null ||
                              exitTime === null ||
                              distance === null ||
                              entryTime === "" ||
                              exitTime === "" ||
                              distance === ""
                            }
                            onClick={addRide}
                          >Add Ride
                          </Button>
                          {loading === true && (
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                              <CircularProgress />
                            </div>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          variant="contained"
                          onClick={handleViewReports}
                        >View Reports
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Wallet
                      walletBalance={walletBalance} />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <RidesTable
                      rows={allRides}
                      title="All Rides"
                      handlePaymentClick={handlePaymentClick}
                    />
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