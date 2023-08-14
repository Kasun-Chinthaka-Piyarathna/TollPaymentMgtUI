
import React from "react"
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Typography } from "@mui/material";

const RidesTable = props => {
  const { rows, title, handlePaymentClick } = props;
  const columns = [
    {
      name: "entry_time",
      label: "Entry Time",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => {
          const { rowData, columnIndex } = tableMeta;
          const dateStr = rowData[columnIndex];
          let d = new Date(dateStr);
          let readableStr = "not yet recorded"
          if (d.toUTCString() !== "Invalid Date") {
            readableStr = d.toLocaleString();
          }
          return (
            <Typography style={{ fontSize: '14px' }}>{readableStr}</Typography>
          );
        },
      },
    },
    {
      name: "exit_time",
      label: "Exit Time",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => {
          const { rowData, columnIndex } = tableMeta;
          const dateStr = rowData[columnIndex];
          let d = new Date(dateStr);
          let readableStr = "not yet recorded"
          if (d.toUTCString() !== "Invalid Date") {
            readableStr = d.toLocaleString();
          }
          return (
            <Typography style={{ fontSize: '14px' }}>{readableStr}</Typography>
          );
        },
      },
    },
    {
      name: "distance",
      label: "Distance (km)",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "speed",
      label: "Average Speed (kmh)",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => {
          const { rowData, columnIndex } = tableMeta;
          const speed = rowData[columnIndex];
          const rounded = parseFloat(speed).toFixed(2);
          return (
            <Typography style={{ fontSize: '14px' }}>{rounded}</Typography>
          );
        },
      },
    },
    {
      name: "ride_fee",
      label: "Ride fee (lkr)",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "fine",
      label: "Overspeed Fine (lkr)",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "total_fee",
      label: "Total Fee (lkr)",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "transaction_status",
      label: "Payment Status",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      label: 'Go To',
      name: '',
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => {
          const { rowIndex } = tableMeta;
          return (
            <>
              <Tooltip title="Do Payment">
                <IconButton
                  id="sessions-button"
                  variant="contained"
                  color="primary"
                  onClick={() => handlePaymentClick(rowIndex)}
                >
                  <PaymentsIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false
  };



  return (
    <MUIDataTable
      title={title}
      data={rows}
      columns={columns}
      options={options}
    />
  );
};

RidesTable.defaultProps = {
  handlePaymentClick: () => { },
};
RidesTable.propTypes = {
  rows: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired,
  handlePaymentClick: PropTypes.func,
};

export default RidesTable;