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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { createData, initialState } from "../helper/helper-functions";

import EnhancedTable from "../src/components/table/enhanced-table";

const formControlCss = css`
  margin-right: 5rem;
`;

const SearchInpCss = css`
  width: 35rem;
  margin-left: 5rem;
  /* .css-z4l6y0-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid #0b72b9 !important;
  } */
`;

const radioLabelCss = {
  ".MuiFormControlLabel-label": {
    fontWeight: 300,
  },
};

const addBtn = (theme) => css`
  color: #fff;
  background-color: ${theme.palette.common.orange};
  border-radius: 50;
  text-transform: none;
  &:hover {
    background-color: ${theme.palette.secondary.light};
  }
`;

const HomePage = () => {
  const platformOptions = ["web", "iOS", "Android"];
  var featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];
  var websiteOptions = ["Basic", "Interactive", "E-commerce"];

  const [rows, setRows] = useState(initialState);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "website" ? "N/A" : complexity,
        service === "website" ? "N/A" : platforms.join(", "),
        service === "website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setIsDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const rowsData = rows.map((row) =>
      Object.values(row).filter((option) => option !== false && option !== true)
    );

    const matches = rowsData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );
    setRows(newRows);
    setPage(0);
  };

  const btnDisableHandler = () => {
    if (service === "website") {
      if (
        name.length === 0 ||
        total.length === 0 ||
        features.length === 0 ||
        features.length > 1
      )
        return true;
    } else {
      if (
        name.length === 0 ||
        total.length === 0 ||
        features.length === 0 ||
        users.length === 0 ||
        complexity.length === 0 ||
        platforms.length === 0 ||
        service.length === 0
      )
        return true;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container direction={"column"}>
        <Grid item css={{ marginTop: "2rem", marginLeft: "5rem" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            value={search}
            onChange={handleSearch}
            placeholder="Search projects or enter a new"
            variant="standard"
            css={css`
              ${SearchInpCss}
            `}
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
        ></Grid>

        <Grid item css={{ marginTop: "5rem" }}>
          <EnhancedTable
            setRows={setRows}
            rows={rows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        {/******** Dialog Section (optinal Section) ********/}
        <Dialog
          fullWidth
          maxWidth="md"
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent={"space-around"}>
              {/******** Name Col ********/}
              <Grid item>
                <Grid item container direction={"column"} sm>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Grid>
                  {/******** Name Col (Service Radio Btn) ********/}
                  <Grid
                    item
                    container
                    direction="column"
                    css={{ marginTop: "5rem" }}
                  >
                    <Grid item>
                      <Typography variant="h4">Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label="service"
                        name="service"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                          setFeatures([]);
                        }}
                      >
                        <FormControlLabel
                          css={radioLabelCss}
                          value="website"
                          label="website"
                          control={<Radio color="secondary" />}
                        />
                        <FormControlLabel
                          css={radioLabelCss}
                          value="Mobile App"
                          label="Mobile App"
                          control={<Radio color="secondary" />}
                        />
                        <FormControlLabel
                          css={radioLabelCss}
                          value="Custom Software"
                          label="Custom Software"
                          control={<Radio color="secondary" />}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item css={{ marginTop: "5rem" }}>
                      <Select
                        disabled={service === "website"}
                        css={{ width: "12rem" }}
                        displayEmpty
                        renderValue={
                          platforms.length > 0 ? null : () => "platforms"
                        }
                        labelId="platforms"
                        id="platforms"
                        multiple
                        value={platforms}
                        onChange={(e) => setPlatforms(e.target.value)}
                        variant="standard"
                      >
                        {platformOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/******** Datepicker Col ********/}
              <Grid item>
                <Grid
                  alignItems={"center"}
                  item
                  container
                  direction="column"
                  css={{ marginTop: 16 }}
                  sm
                >
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
                  {/******** Datepicker Col (Complexity Radio Btn) ********/}
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      css={{ marginTop: "5rem" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="complexity"
                          name="complexity"
                          value={complexity}
                          onChange={(e) => setComplexity(e.target.value)}
                        >
                          <FormControlLabel
                            css={radioLabelCss}
                            value="Low"
                            label="Low"
                            control={<Radio color="secondary" />}
                          />
                          <FormControlLabel
                            css={radioLabelCss}
                            value="Medium"
                            label="Medium"
                            control={<Radio color="secondary" />}
                          />
                          <FormControlLabel
                            css={radioLabelCss}
                            value="High"
                            label="High"
                            control={<Radio color="secondary" />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/******** Total Col ********/}
              <Grid item>
                <Grid
                  item
                  container
                  direction={"column"}
                  alignItems={"flex-end"}
                  sm
                >
                  <Grid item>
                    <TextField
                      variant="standard"
                      label="total"
                      id="total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/******** Total Col ( Users Radio Btn) ********/}
                  <Grid item css={{ alignSelf: "flex-end" }}>
                    <Grid
                      item
                      container
                      direction="column"
                      css={{ marginTop: "5rem", marginLeft: 16 }}
                    >
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="users"
                          name="users"
                          value={users}
                          onChange={(e) => setUsers(e.target.value)}
                        >
                          <FormControlLabel
                            css={radioLabelCss}
                            disabled={service === "website"}
                            value="0-10"
                            label="0-10"
                            control={<Radio color="secondary" />}
                          />
                          <FormControlLabel
                            disabled={service === "website"}
                            css={radioLabelCss}
                            value="10-100"
                            label="10-100"
                            control={<Radio color="secondary" />}
                          />
                          <FormControlLabel
                            disabled={service === "website"}
                            css={radioLabelCss}
                            value="100+"
                            label="100+"
                            control={<Radio color="secondary" />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item css={{ marginTop: "5rem" }}>
                    <Select
                      css={{ width: "12rem" }}
                      displayEmpty
                      renderValue={
                        features.length > 0 ? null : () => "features"
                      }
                      labelId="features"
                      MenuProps={{ style: { zIndex: 1302 } }}
                      id="features"
                      multiple
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      variant="standard"
                    >
                      {service === "website" &&
                        (featureOptions = websiteOptions)}
                      {featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/******** Button Section  ********/}

            <Grid
              container
              justifyContent={"center"}
              css={{ marginTop: "3rem" }}
              columnGap={3}
            >
              <Grid item>
                <Button
                  color="primary"
                  css={{ fontWeight: 300, textTransform: "none" }}
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  css={addBtn}
                  disabled={btnDisableHandler()}
                  onClick={addProject}
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </LocalizationProvider>
  );
};

export default HomePage;
