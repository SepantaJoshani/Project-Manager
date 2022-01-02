import React, { Fragment, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
// import Hamburger from 'hamburger-react'

const Header = ({changeThemeHandler}) => {
  const theme = useTheme();
  // const [isOpen, setOpen] = useState(false)
  

  return (
    <Fragment>
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Toolbar>
          {/* <Hamburger size={32} toggled={isOpen}  toggle={setOpen} /> */}

          <Typography variant="h3" color="white" sx={{ cursor: "pointer" }}>
            Project Manager
          </Typography>

          <IconButton
            onClick={changeThemeHandler}
            sx={{ ml: "auto" }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

export default Header;
