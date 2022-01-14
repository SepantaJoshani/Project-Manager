import React, { Fragment, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpIcon from "@mui/icons-material/Help";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Header = ({ changeThemeHandler }) => {
  const theme = useTheme();
  // const [isOpen, setOpen] = useState(false)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

          <IconButton sx={{ color: "#fff" }} onClick={handleClickOpen}>
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{fontSize:'1.6rem'}}>{"A little help for adding project"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Well as you see you can choose 1 of 3 services but the diffrence is
            when you choose website service there wont be a complexity or users
            or platform option to choose and also you can choose only 1 feature
            for it i mean in the select option but for the others all of options
            are available
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Header;
