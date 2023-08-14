import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const PaymentReceiptDialog = props => {
    const { open, handleClose, selectedRideRecord, handePayment } = props;
    if (!selectedRideRecord) {
        return;
    }
    const { entry_time, exit_time, distance, ride_fee, fine, total_fee, user, transaction_status } = selectedRideRecord;
    const { wallet } = user;
    const balance = wallet - total_fee;
    let entryTime =  "";
    let exitTime = ""
    let d = new Date(entry_time);
    let d2 = new Date(exit_time);
    if (d.toUTCString() !== "Invalid Date") {
        entryTime = d.toLocaleString();
    }
    if (d2.toUTCString() !== "Invalid Date") {
        exitTime = d2.toLocaleString();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Receipt</DialogTitle>
            <DialogContent>
                <div >
                    <Grid container spacing={2} style={{ padding: "20px" }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                Entry Time
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                {entryTime}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                Exit time
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                {exitTime}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                Distance
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                {distance} km
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                Ride Fee
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                {ride_fee} lkr
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                Overspeed Fines
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                {fine} lkr
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom style={{ color: "chocolate", fontWeight: '900' }}>
                                Total Fee
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom style={{ color: "chocolate", fontWeight: '900' }}>
                                {total_fee} lkr
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom style={{ color: "cornflowerblue", fontWeight: '900' }}>
                                Wallet Balance
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom style={{ color: "cornflowerblue", fontWeight: '900' }} >
                                {wallet} lkr
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                Payment Status
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                {transaction_status}
                            </Typography>
                        </Grid>
                        {balance < 0 && (
                            <Grid item xs={12} sm={12}>
                                <Typography variant="body2" gutterBottom style={{ textAlign: "center", color: "red" }}>
                                    You dont have sufficent balance in your wallet. Please refill it before doing next payment!
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handePayment}
                    disabled={transaction_status === "Success" || balance < 0}
                >Pay Now</Button>
            </DialogActions>
        </Dialog>
    );
}

PaymentReceiptDialog.defaultProps = {
};
PaymentReceiptDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedRideRecord: PropTypes.object.isRequired,
    handePayment: PropTypes.func.isRequired,
};

export default PaymentReceiptDialog;