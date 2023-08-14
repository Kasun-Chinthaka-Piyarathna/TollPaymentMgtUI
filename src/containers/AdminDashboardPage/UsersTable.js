
import React from "react"
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Typography } from "@mui/material";

const UsersTable = props => {
  const { rows, title, openWallet } = props;
  const columns = [
    {
      name: "username",
      label: "Username",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "firstname",
      label: "Firstname",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "lastname",
      label: "Lastname",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "phonenumber",
      label: "Phone Number",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "vehiclenumber",
      label: "Vehicle",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "postaladdress",
      label: "Postal Address",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "roles",
      label: "Role",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => {
          const { rowData, columnIndex } = tableMeta;
          const arr = rowData[columnIndex];
          let roles = '';
          for (let i = 0; i < arr.length; i += 1) {
            let roleType = arr[i].name;
            if (arr[i].name === "ROLE_USER") {
              roleType = "User";
            }
            if (arr[i].name === "ROLE_ADMIN") {
              roleType = "Admin";
            }
            roles = roles.concat(roleType);
          }
          return (
            <Typography>{roles}</Typography>
          );
        },
      },
    },
    {
      name: "wallet",
      label: "Wallet",
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
              <Tooltip title="Update wallet">
                <IconButton
                  id="sessions-button"
                  variant="contained"
                  color="primary"
                  onClick={() => openWallet(rowIndex)}
                >
                  <PaymentsIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        }
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

UsersTable.defaultProps = {
  handlePaymentClick: () => { },
};
UsersTable.propTypes = {
  rows: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired,
  openWallet: PropTypes.func.isRequired,
};

export default UsersTable;