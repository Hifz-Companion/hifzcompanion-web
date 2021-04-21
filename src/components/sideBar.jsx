import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import firebase from "firebase/app";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

class SideBar extends Component {
  state = {
    open: false,
    openFurther: {
      a: false,
      b: false,
    },
    signedIn: false,
    theme: useTheme,
    classes: useStyles,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({signedIn : true})
        // ...
      } else {
        // User is signed out.
        this.setState({signedIn : false})
      }
    });
  }

  handleDrawerOpen = () => {
    const open = true;
    this.setState({ open });
  };

  handleDrawerClose = () => {
    const open = false;
    this.setState({ open });
  };

  render() {
    const { open, classes, theme, signedIn } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              color="secondary"
              style={{ width: "100%" }}
              edge="end"
              onClick={this.handleDrawerClose}
            >
              {theme.direction === "ltr" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
         

          <Divider />
              {/* {signedIn && 
              <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/my-scheduled"
                      >
                <ListItem button>
                  <ListItemIcon><AccessTimeIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="My Schedules" />
                </ListItem>
              
                </a>
              </List>} */}
              <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/questionbank"
                      >
                <ListItem button>
                  <ListItemIcon><LibraryBooksIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="Question Bank" />
                  {/* {sideMenu.openFurther ? <ExpandLess /> : <ExpandMore />} */}
                </ListItem>
              
                </a>
              </List>
              {/* <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/exam-simulation"
                      >
                <ListItem button>
                  <ListItemIcon><CreateIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="Simulate Exam" />
                </ListItem>
              
                </a>
              </List> */}
              <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/osce"
                      >
                <ListItem button>
                  <ListItemIcon><AlarmOnIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="OSCE" />
                  {/* {sideMenu.openFurther ? <ExpandLess /> : <ExpandMore />} */}
                </ListItem>
              
                </a>
              </List>
              {/* <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/robot-test"
                      >
                <ListItem button>
                  <ListItemIcon><PersonIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="Robot Patient" />
                </ListItem>
              
                </a>
              </List> */}
              {/* <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="https://blog.acabest.com"
                      >
                <ListItem button>
                  <ListItemIcon><BookIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItem>
              
                </a>
              </List> */}
              <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/about"
                      >
                <ListItem button>
                  <ListItemIcon><InfoIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="About" />
                  {/* {sideMenu.openFurther ? <ExpandLess /> : <ExpandMore />} */}
                </ListItem>
              
                </a>
              </List>
              <List style={{ padding: "0px" }}>
              <a style={{
                          textDecoration: "none",
                        }}
                        href="/contact"
                      >
                <ListItem button>
                  <ListItemIcon><ContactMailIcon color="secondary"/></ListItemIcon>
                  <ListItemText primary="Contact" />
                  {/* {sideMenu.openFurther ? <ExpandLess /> : <ExpandMore />} */}
                </ListItem>
              
                </a>
              </List>
          
          
        </Drawer>
      </div>
    );
  }
}

export default SideBar;
