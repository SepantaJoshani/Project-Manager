import React, { Fragment,useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// import Hamburger from 'hamburger-react'

const Header = () => {
  
  // const [isOpen, setOpen] = useState(false)
  return (
    <Fragment>
      <AppBar position="fixed" color="primary">
        <Grid container >
          <Toolbar>
          {/* <Hamburger size={32} toggled={isOpen}  toggle={setOpen} /> */}
            <Typography variant="h3" color='white' sx={{cursor:'pointer'}}>Project Manager</Typography>
          </Toolbar>
        </Grid>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

export default Header;
