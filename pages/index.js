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

// const userRadioStyle ={

// }

const HomePage = () => {
  const platformOptions = ["web", "iOS", "Android"];
  const featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

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
        >
          <Grid item css={{ marginRight: 70 }}>
            <FilterListIcon color="secondary" css={{ fontSize: 50 }} />
          </Grid>
        </Grid>

        <Grid item>
          <TableComponent />
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
                        onChange={(e) => setService(e.target.value)}
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
                  <Grid item>
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
                            value="0-10"
                            label="0-10"
                            control={<Radio color="secondary" />}
                          />
                          <FormControlLabel
                            css={radioLabelCss}
                            value="10-100"
                            label="10-100"
                            control={<Radio color="secondary" />}
                          />
                          <FormControlLabel
                            css={radioLabelCss}
                            value="100+"
                            label="100+"
                            control={<Radio color="secondary" />}
                          />
                        </RadioGroup>
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
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </LocalizationProvider>
  );
};

export default HomePage;
