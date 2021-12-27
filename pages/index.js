/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Grid from "@mui/material/Grid";
import { css, useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableComponent from "../src/components/table/table";
import FilterListIcon from "@mui/icons-material/FilterList";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "@mui/lab/DatePicker";

const formControlCss = css`
  margin-right: 5rem;
`;

const textFieldCss = (theme) => ({
  width: "35rem",
  marginLeft: "5rem",
  // [theme.breakpoints.down("md")]: {
  //   background: "red",
  // },
});

const HomePage = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState(null);

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container direction={"column"}>
        <Grid item css={{ marginTop: "2rem", marginLeft: "5rem" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search projects or enter a new"
            variant="standard"
            css={textFieldCss}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => setIsDialogOpen(true)}
                  css={{ cursor: "pointer" }}
                  position="end"
                >
                  <AddIcon color="primary" css={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item css={{ marginLeft: "5rem", marginTop: "2rem" }}>
          <FormGroup row>
            <FormControlLabel
              css={formControlCss}
              control={
                <Switch
                  checked={websiteChecked}
                  onChange={() => setWebsiteChecked((prev) => !prev)}
                />
              }
              color="primary"
              label={"Websites"}
              labelPlacement="start"
            />
            <FormControlLabel
              css={formControlCss}
              control={
                <Switch
                  checked={iOSChecked}
                  onChange={() => setIOSChecked((prev) => !prev)}
                />
              }
              color="primary"
              label={"iOS Apps"}
              labelPlacement="start"
            />
            <FormControlLabel
              css={formControlCss}
              control={
                <Switch
                  checked={androidChecked}
                  onChange={() => setAndroidChecked((prev) => !prev)}
                />
              }
              color="primary"
              label={"Android Apps"}
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={softwareChecked}
                  onChange={() => setSoftwareChecked((prev) => !prev)}
                />
              }
              color="primary"
              label={"Custom Software"}
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        {/******** Table Section & filterIcon ********/}
        <Grid
          item
          container
          justifyContent="flex-end"
          css={{ marginTop: "5rem" }}
        >
          <Grid item css={{ marginRight: 70 }}>
            <FilterListIcon color="secondary" css={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item>
          <TableComponent />
        </Grid>
        {/******** Dialog Section (optinal Section) ********/}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container>
              {/******** Name Col ********/}
              <Grid item container direction={"column"}>
                <Grid item>
                  <TextField
                    variant="standard"
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              {/******** Datepicker Col ********/}
              <Grid item container direction="column">
                <Grid item>
                  <DatePicker
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    renderInput={(params) => (
                      <TextField variant="standard" {...params} />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </LocalizationProvider>
  );
};

export default HomePage;
