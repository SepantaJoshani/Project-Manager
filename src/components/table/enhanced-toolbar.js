import * as React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import  Textfield  from '@mui/material/TextField';
import { alpha } from "@mui/material";


const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    selected,
    setSelected,
    rows,
    setRows,
    filterPrice,
    setFilterPrice,
    totalFilter,
    setTotalFilter,
  } = props;

  const [alert, setAlert] = React.useState({
    open: false,
    backgroundColor: "#DD3232",
    message: "Row deleted!",
  });
  const [undo, setUndo] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const onDeleteHandler = () => {
    const newRows = [...rows];
    console.log(selected);
    const selectedRows = newRows.filter((row) => selected.includes(row.name));
    selectedRows.map((row) => (row.search = false));

    setRows(newRows);
    setUndo(selectedRows);
    setSelected([]);
    setAlert({ ...alert, open: true });
  };
  const onUndoHandler = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...rows];
    const redo = [...undo];

    redo.map((row) => (row.search = true));

    newRows.concat(redo);
    console.log(redo);
    setRows(newRows);
  };

  const onCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      setAlert({ ...alert, open: false });
      const newRows = [...rows];
      const name = [...undo.map((row) => row.name)];
      setRows(newRows.filter((row) => !name.includes(row.name)));
    }
  };

  const handleTotalFilter = (e) => {
    const enteredValue = e.target.value;
    setFilterPrice(enteredValue);

    if (enteredValue !== "") {
      const newRows = [...rows];
      newRows.map((row) =>
        eval(
          `${enteredValue} ${
            totalFilter === "=" ? "===" : totalFilter
          }  ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );
      setRows(newRows);
    } else {
      const newRows = [...rows];
      newRows.map((row) => (row.search = true));
      setRows(newRows);
    }
  };

  const filterChange = (operator) => {
    if (filterPrice !== "") {
      const newRows = [...rows];
      newRows.map((row) =>
        eval(
          `${filterPrice} ${
            operator === "=" ? "===" : operator
          }  ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );
      setRows(newRows);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.common.orange,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }}>{null}</Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteHandler}>
            <DeleteIcon sx={{ fontSize: 30 }} color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick}>
            <FilterListIcon sx={{ fontSize: 50 }} color="secondary" />
          </IconButton>
        </Tooltip>
      )}

      {/******* SnackBar Place (optional) *******/}

      <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            background: alert.backgroundColor,
          },
        }}
        message={alert.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={onCloseHandler}
        action={
          <Button onClick={onUndoHandler} sx={{ color: "#fff" }}>
            Undo
          </Button>
        }
      />
      {/******* Menu Place (optional) *******/}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        disableAutoFocusItem
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem
          sx={{
            "&.MuiMenuItem-root": {
              ":hover": {
                background: "transparent",
              },
            },
            "&.Mui-focusVisible": {
              background: "transparent",
            },
          }}
        >
          <Textfield
            value={filterPrice}
            onChange={handleTotalFilter}
            FormHelperTextProps={{ sx: { color: "common.blue", fontSize: 14 } }}
            helperText="click the icon to change the filter"
            variant="standard"
            placeholder="Enter a price"
            InputProps={{
              type: "number",
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <Box sx={{ color: "secondary.main", fontSize: "1.5rem" }}>
                    $
                  </Box>{" "}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    setTotalFilter(
                      totalFilter === ">"
                        ? "<"
                        : totalFilter === "<"
                        ? "="
                        : ">"
                    );
                    filterChange(
                      totalFilter === ">"
                        ? "<"
                        : totalFilter === "<"
                        ? "="
                        : ">"
                    );
                  }}
                  position="end"
                  sx={{ cursor: "pointer" }}
                >
                  <Box sx={{ fontSize: "2rem", color: "secondary.main" }}>
                    {totalFilter}
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
