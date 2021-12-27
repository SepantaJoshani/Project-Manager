import React, { Fragment, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";


const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) => {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
  };
};

const TableComponent = () => {
  const [rows, setRows] = useState([createData("Sepanta",'11/2/19','website','commerce','N/A','N/A','N/A','$15000')]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Features</TableCell>
              <TableCell>Complexity</TableCell>
              <TableCell>Platforms</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index + row}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.features}</TableCell>
                <TableCell>{row.complexity}</TableCell>
                <TableCell>{row.platforms}</TableCell>
                <TableCell>{row.users}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TableComponent;
