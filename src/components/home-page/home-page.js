/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "@mui/lab/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { createData, initialState } from "../../../helper/helper-functions";
import Hidden from "@mui/material/Hidden";
import EnhancedTable from "../table/enhanced-table";

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

const Home = () => {
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
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

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

  useEffect(() => { 
    if (service === "website") {
      setUsers("");
      setPlatforms([]);
    }
  }, [service]);

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

  //************Service Section **********

  const serviceSection = (
    <>
      <Grid item sx={{ marginTop: matchesMD ? 10:'5rem' }}>
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
    </>
  );

  //************Complexity Section **********

  const complexitySection = (
    <Grid item sx={{ marginBottom: matchesMD && 10 }}>
      <Grid
        item
        container
        direction="column"
        css={{ marginTop: matchesMD ? 50 : "5rem" }}
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
  );

  //************ Users Section **********

  const usersSection = (
    <Grid item css={{ alignSelf: matchesMD ? "center" : "flex-end" }}>
      <Grid
        item
        container
        direction="column"
        css={{
          marginTop: matchesSM ? 50 : "5rem",
          marginLeft: 16,
        }}
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
  );

  //************The whole output **********

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container direction={"column"} alignItems={matchesSM && "center"}>
        <Grid
          item
          sx={{
            marginTop:matchesSM?"4rem": "3rem",
            marginLeft: {
              xs: 0,
              sm: "5rem",
            },
          }}
        >
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item sx={{marginTop:matchesSM&&'1.5rem'}}>
          <TextField
            value={search}
            onChange={handleSearch}
            placeholder="Search or Add"
            variant="standard"
            sx={{
              width: {
                xs: "100%",
                sm: "20rem",
                sm: "25rem",
                md: "30rem",
              },
              marginLeft: {
                xs: 0,
                sm: "5rem",
              },
            }}
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
        <Grid
          item
          sx={{ marginLeft: matchesSM ? 0 : "5rem", marginTop: "2rem" }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesMD ? "column" : "row"}
              justifyContent={matchesMD && "center"}
            >
              <Grid item>
                <FormControlLabel
                  sx={{
                    marginRight: {
                      xs: 0,
                      md: "1.8rem",
                      lg: "3.5rem",
                    },
                  }}
                  control={
                    <Switch
                      checked={websiteChecked}
                      onChange={() => setWebsiteChecked((prev) => !prev)}
                    />
                  }
                  color="primary"
                  label={"Websites"}
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  sx={{
                    marginRight: {
                      xs: 0,
                      md: "1.8rem",
                      lg: "4rem",
                    },
                  }}
                  control={
                    <Switch
                      checked={iOSChecked}
                      onChange={() => setIOSChecked((prev) => !prev)}
                    />
                  }
                  color="primary"
                  label={"iOS Apps"}
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  sx={{
                    marginRight: {
                      xs: 0,
                      md: "1.8rem",
                      lg: "3.5rem",
                    },
                  }}
                  control={
                    <Switch
                      checked={androidChecked}
                      onChange={() => setAndroidChecked((prev) => !prev)}
                    />
                  }
                  color="primary"
                  label={"Android Apps"}
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  sx={{
                    marginRight: {
                      xs: 0,
                      md: "1.8rem",
                      lg: "3.5rem",
                    },
                  }}
                  control={
                    <Switch
                      checked={softwareChecked}
                      onChange={() => setSoftwareChecked((prev) => !prev)}
                    />
                  }
                  color="primary"
                  label={"Custom Software"}
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        {/******** Table Section & filterIcon ********/}

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

        {/******** Dialog Section (optinal Section) ********/}
        <Dialog
          fullWidth
          fullScreen={matchesMD}
          maxWidth="md"
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Typography variant="h1" gutterBottom sx={{fontSize:matchesSM&&'2rem'}}>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              justifyContent={"space-around"}
              direction={matchesMD ? "column" : "row"}
            >
              {/******** Name Col ********/}
              <Grid item>
                <Grid
                  item
                  container
                  direction={"column"}
                  alignItems={matchesMD && "center"}
                  sm
                >
                  <Hidden mdUp>{serviceSection}</Hidden>
                  <Hidden mdUp>{usersSection}</Hidden>
                  <Hidden mdUp>{complexitySection}</Hidden>
                  <Grid item>
                    <TextField
                      style={{ width: matchesMD && 250 }}
                      fullWidth={!matchesMD}
                      variant="standard"
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      autoComplete="off"
                    />
                  </Grid>
                  {/******** Name Col (Service Radio Btn) ********/}
                  <Grid
                    item
                    container
                    direction="column"
                    alignItems={matchesMD && "center"}
                  >
                    <Hidden mdDown>{serviceSection}</Hidden>
                    <Grid item css={{ marginTop: matchesMD ? 50 : "5rem" }}>
                      <Select
                        disabled={service === "website"}
                        css={{ width: matchesMD ? "250px" : "12rem" }}
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
              <Grid item sx={{ marginTop: matchesMD ? 7 :'1rem' }}>
                <Grid
                  alignItems={"center"}
                  item
                  container
                  direction="column"
                  sm
                >
                  <Grid item>
                    <DatePicker
                      inputFormat="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      renderInput={(params) => (
                        <TextField
                          style={{ width: matchesMD && 250 }}
                          variant="standard"
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  {/******** Datepicker Col (Complexity Radio Btn) ********/}
                  <Hidden mdDown>{complexitySection}</Hidden>
                </Grid>
              </Grid>
              {/******** Total Col ********/}
              <Grid item>
                <Grid
                  item
                  container
                  direction={"column"}
                  alignItems={matchesMD ? "center" : "flex-end"}
                  sm
                >
                  <Grid item sx={{ marginTop: matchesMD && 5 }}>
                    <TextField
                      style={{ width: matchesMD && 250 }}
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
                      autoComplete="off"
                    />
                  </Grid>
                  {/******** Total Col ( Users Radio Btn) ********/}
                  <Hidden mdDown>{usersSection}</Hidden>
                  <Grid item sx={{ marginTop: matchesSM ? 10 : "5rem" }}>
                    <Select
                      css={{ width: matchesMD ? "250px" : "12rem" }}
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

export default Home;
