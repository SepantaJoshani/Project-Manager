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
  const [rows, setRows] = useState([
    createData(
      "Sepanta",
      "11/2/19",
      "website",
      "commerce",
      "N/A",
      "N/A",
      "N/A",
      "$15000"
    ),
    createData(
      "Bill Gates",
      "10/17/19",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600"
    ),
    createData(
      "Steve Jobs",
      "2/13/19",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250"
    ),
    createData(
      "Stan Smith",
      "2/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "iOS, Android",
      "10-100",
      "$1250"
    ),
    createData(
      "Albert Einstein",
      "2/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250"
    ),
  ]);

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
                <TableCell align="center" sx={{maxWidth:'5rem'}}>{row.features}</TableCell>
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
