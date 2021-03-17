import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, gender, country, department) {
  return {id, date, name, shipTo, paymentMethod, amount, gender, country, department};
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', '01234567', '+3069123457', 312.44, 'male', 'Afghanistan', 'Electric'),
  createData(1, '16 Mar, 2019', 'Elvis Presley', '01234567', '+3069123457', 312.44, 'male', 'Afghanistan', 'Electric'),
  createData(2, '16 Mar, 2019', 'Elvis Presley', '01234567', '+3069123457', 312.44, 'male', 'Afghanistan', 'Electric'),
  createData(3, '16 Mar, 2019', 'Elvis Presley', '01234567', '+3069123457', 312.44, 'male', 'Afghanistan', 'Electric'),
  createData(4, '16 Mar, 2019', 'Elvis Presley', '01234567', '+3069123457', 312.44, 'male', 'Afghanistan', 'Electric'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Id No.</TableCell>
            <TableCell>Mobile No.</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell align="right">{row.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
