import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, entryTime, exitTime, toatlTime, distance, speed, cost, fines, totalCost) {
  return { id, date, entryTime, exitTime, toatlTime, distance, speed, cost, fines, totalCost };
}

const rows = [
  createData(
    1,
    '2023-7-30',
    '8.30 AM',
    '11.05 AM',
    '2h 35m',
    '200 KM',
    '110 kmh',
    '3500 LKR',
    '0',
    '3500 LKR',
  ),
  createData(
    2,
    '2023-7-30',
    '12.30 PM',
    '02.30 PM',
    '2h 0m',
    '100 KM',
    '50 kmh',
    '1500 LKR',
    '0',
    '1500 LKR',
  ),
  createData(
    3,
    '2023-7-30',
    '06.00 PM',
    '07.30 PM',
    '1h 30m',
    '120 KM',
    '90 kmh',
    '2000 LKR',
    '0',
    '2000 LKR',
  ),
  createData(
    4,
    '2023-8-01',
    '8.30 AM',
    '12.00 AM',
    '3h 30m',
    '200 KM',
    '150 kmh',
    '4000 LKR',
    '350',
    '4350 LKR',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Journeys</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Entry time</TableCell>
            <TableCell>Exit Time</TableCell>
            <TableCell>Total Time</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Average speed</TableCell>
            <TableCell>Journey Cost</TableCell>
            <TableCell>Fines</TableCell>
            <TableCell align="right">Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.entryTime}</TableCell>
              <TableCell>{row.exitTime}</TableCell>
              <TableCell>{row.toatlTime}</TableCell>
              <TableCell>{row.distance}</TableCell>
              <TableCell>{row.speed}</TableCell>
              <TableCell>{row.cost}</TableCell>
              <TableCell>{row.fines}</TableCell>
              <TableCell align="right">{`${row.totalCost}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more journeys
      </Link>
    </React.Fragment>
  );
}