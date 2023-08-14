import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PaymentTable from './PaymentTable';

const PaymentReportsDialog = props => {
    const { open, handleClose, weeklyRides, weeklyDistance, weeklyPayment } = props

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle>Weekly Reorts ( Mon - Sun )</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Total Distance you have travelled : {weeklyDistance} km
                </DialogContentText>
                <DialogContentText style={{ marginTop: '10px' }}>
                    Total Payment you have made : {weeklyPayment} lkr
                </DialogContentText>
                <div style={{ marginTop: '20px' }}>
                    <PaymentTable
                        rows={weeklyRides}
                        title="All Rides"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

PaymentReportsDialog.defaultProps = {
};
PaymentReportsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    weeklyRides: PropTypes.array.isRequired,
    weeklyDistance: PropTypes.string.isRequired,
    weeklyPayment: PropTypes.string.isRequired,
};

export default PaymentReportsDialog;