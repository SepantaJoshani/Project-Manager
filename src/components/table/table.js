import React, { Fragment, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";



const TableComponent = ({rows}) => {
 

  return (
    <Fragment>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Features</TableCell>
              <TableCell align="center">Complexity</TableCell>
              <TableCell align="center">Platforms</TableCell>
              <TableCell align="center">Users</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index + row}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.service}</TableCell>
                <TableCell align="center" sx={{ maxWidth: "5rem" }}>
                  {row.features}
                </TableCell>
                <TableCell align="center">{row.complexity}</TableCell>
                <TableCell align="center">{row.platforms}</TableCell>
                <TableCell align="center">{row.users}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TableComponent;
