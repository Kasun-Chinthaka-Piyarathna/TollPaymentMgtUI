import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const UpdateWalletDialog = props => {
    const { open, handleClose, handleWalletUpdate, SetNewPayment, newPayment, selectVehicle } = props;

    const onPaymentChange = e => {
        const { target } = e;
        const { value } = target;
        SetNewPayment(value);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Update Wallet of {selectVehicle}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="payment"
                    label="New Payment"
                    type="number"
                    fullWidth
                    variant="standard"
                    newPayment={newPayment}
                    onChange={onPaymentChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleWalletUpdate}
                    disabled={newPayment === "" || newPayment === null}
                >Update Wallet</Button>
            </DialogActions>
        </Dialog>
    );
}

UpdateWalletDialog.defaultProps = {
};
UpdateWalletDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleWalletUpdate: PropTypes.func.isRequired,
    SetNewPayment: PropTypes.func.isRequired,
    newPayment: PropTypes.string.isRequired,
    selectVehicle: PropTypes.string.isRequired,
};

export default UpdateWalletDialog;