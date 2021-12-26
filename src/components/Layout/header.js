import React, { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

const Header = () => {
  return (
    <Fragment>
      <AppBar position="fixed" color="primary">
        <Grid container justifyContent={"center"}>
          <Toolbar>
            <Typography variant="h3" color='white' sx={{cursor:'pointer'}}>Project Manager</Typography>
          </Toolbar>
        </Grid>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

export default Header;
