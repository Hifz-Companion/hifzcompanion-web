import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import SideBar from "./sideBar";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { toast } from "react-toastify";
// import logoFavicon from "../img/logo-navbar.png"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginLeft: "30px",
  },
  grow: {
    flexGrow: 1,
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const currentUserId = localStorage.getItem("currentUserId");
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function logOutUser() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          toast.success("Successfully Signed Out. See you again soon!");
          setTimeout(function () {
            window.location = "/login";
          }, 2000);
          // console.log("Signed Out");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  }  


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setSignedIn(true);
      // ...
    } else {
      // User is signed out.
      setSignedIn(false);
    }
  });

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>
        <Link to={`/my-profile/${currentUserId}/`}>My Profile</Link>
      </MenuItem> */}

      {signedIn && (
        <Button color="secondary" onClick={logOutUser}>
          <strong>Logout</strong>
        </Button>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "#139537"}}>
        <Toolbar>
          <Link to="/">
            {/* <img src={logoFavicon} alt="Logo" height="35px" width="35px" style={{margin: "0 7px"}} /> */}
          </Link>  
          <Typography
            component={Link}
            to="/"
            id="navbar-brand"
            variant="h5"
            noWrap
           style={{ color: "white", textDecoration: "none" }}
          >
            Hifz Companion
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!signedIn && (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                style={{ marginRight: "10px" }}
              >
                <strong>Login</strong>
              </Button>
            )}
          </div>
          <div className={classes.sectionDesktop}>
            {signedIn && (
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ marginRight: "10px" }}
              >
                <AccountCircle />
              </IconButton>
            )}
          </div>
          <SideBar />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default NavBar;
