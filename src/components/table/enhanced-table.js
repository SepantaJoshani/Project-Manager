import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import EnhancedTableHead from "./enhanced-table-head";
import EnhancedTableToolbar from "./enhanced-toolbar";
import { stableSort, getComparator } from "../../../helper/table-helper";

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [filterPrice, setFilterPrice] = React.useState("");
  const [totalFilter, setTotalFilter] = React.useState(">");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const switchFilter = () => {
    const { websiteChecked, iOSChecked, androidChecked, softwareChecked } =
      props;

    const websites = props.rows.filter(
      (row) => websiteChecked && row.service === "website"
    );

    const iOSApps = props.rows.filter(
      (row) => iOSChecked && row.platforms.includes("iOS")
    );

    const androidApps = props.rows.filter(
      (row) => androidChecked && row.platforms.includes("Android")
    );

    const softwareApps = props.rows.filter(
      (row) => softwareChecked && row.service === "Custom Software"
    );

    if (!websiteChecked && !iOSChecked && !androidChecked && !softwareChecked) {
      return props.rows;
    } else {
      let newRows = websites.concat(
        iOSApps.filter((item) => websites.indexOf(item) < 0)
      );
      let newRows2 = newRows.concat(
        androidApps.filter((item) => newRows.indexOf(item) < 0)
      );

      let newRows3 = newRows2.concat(
        softwareApps.filter((item) => newRows2.indexOf(item) < 0)
      );

      return newRows3;
    }
  };

  const priceFilters = (switchRows) => {
    if (filterPrice !== "") {
      const newRows = [...switchRows];
      newRows.map((row) =>
        eval(
          `${filterPrice} ${
            totalFilter === "=" ? "===" : totalFilter
          }  ${row.total.slice(1, row.total.length)}`
        )
          ? row.search === false
            ? null
            : (row.search = true)
          : (row.search = false)
      );
      return newRows;
    } else {
      return switchRows;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "5rem",
        marginBottom: {
          xs: "40rem",
          lg: "35rem",
        },
      }}
    >
      <Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          setRows={props.setRows}
          rows={props.rows}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          totalFilter={totalFilter}
          setTotalFilter={setTotalFilter}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(
                priceFilters(switchFilter()).filter((row) => row.search),
                getComparator(order, orderBy)
              )
                .slice(
                  props.page * rowsPerPage,
                  props.page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell
                        align="center"
                        sx={{width:'5rem' }}
                      >
                        {row.features}
                      </TableCell>
                      <TableCell align="center">{row.complexity}</TableCell>
                      <TableCell align="center">{row.platforms}</TableCell>
                      <TableCell align="center">{row.users}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 25]}
          component="div"
          count={
            priceFilters(switchFilter()).filter((row) => row.search).length
          }
          rowsPerPage={rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{overflow:'unset'}}
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            {filterPrice !== "" && (
              <Chip
                onDelete={() => {
                  setFilterPrice("");
                  const newRows = [...props.rows];
                  newRows.map((row) => (row.search = true));
                  props.setRows(newRows);
                }}
                sx={{
                  marginRight: "2rem",
                  backgroundColor: "primary.main",
                  color: "#fff",
                }}
                label={
                  totalFilter === ">"
                    ? `Less than $${filterPrice}`
                    : totalFilter === "<"
                    ? `Greater than $${filterPrice}`
                    : `Equal to $${filterPrice}`
                }
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
