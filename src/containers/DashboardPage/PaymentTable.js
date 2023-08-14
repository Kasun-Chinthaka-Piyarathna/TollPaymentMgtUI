
import React from "react"
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

const PaymentTable = props => {
  const { rows, title } = props;
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
      label: "Total Ride Fee (lkr)",
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
      name: "start_balance",
      label: "Start Wallet Balance (lkr)",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "remaining_balance",
      label: "End Wallet Balance (lkr)",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "transaction_time",
      label: "Payment Time",
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

PaymentTable.defaultProps = {
};
PaymentTable.propTypes = {
  rows: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired,
};

export default PaymentTable;