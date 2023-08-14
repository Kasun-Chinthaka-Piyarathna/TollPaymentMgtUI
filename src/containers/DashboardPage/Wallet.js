import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import Title from './Title';

const Wallet = props => {
  const { walletBalance } = props;
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  return (
    <React.Fragment>
      <Title>Wallet Balance</Title>
      <Typography component="p" variant="h4">
        {walletBalance} LKR
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {dateTime}
      </Typography>
    </React.Fragment>
  );
};

Wallet.defaultProps = {
};
Wallet.propTypes = {
  walletBalance: PropTypes.string.isRequired,
};

export default Wallet;