import React, { useEffect, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});

  const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Resume Builder
        </Typography>
        {user?.email ? (
          <IconButton onClick={handleClickOpen}>
            <Avatar src={user.picture} alt={user.firstName}></Avatar>
          </IconButton>
        ) : (
          <></>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Logout ? 🥺"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={logout}>Yes</Button>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
