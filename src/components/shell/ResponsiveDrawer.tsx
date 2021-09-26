import React, { Fragment, FunctionComponent, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import UserControl from "./UserControl";
import { LINK_LIST } from "router/drawerLinks";
import { IRoute } from "router/routes";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ErrorIcon from "@material-ui/icons/Error";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      background: "#dd2020",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    appBarTitle: {
      fontFamily: "Nunito Sans",
    },
    listItem: {
      width: "auto",
      margin: "8px",
      borderRadius: "5px",
      color: "#203e55",
      "&:hover": {
        backgroundColor: "rgba(221, 32, 32, 0.08)",
        color: "#dd2020",
      },
    },
    listItemSelected: {
      backgroundColor: "rgba(221, 32, 32, 0.12) !important",
      color: "#dd2020",
      "&:hover": {
        backgroundColor: "rgba(221, 32, 32, 0.12)",
      },
    },
    listItemText: {
      display: "flex",
      fontSize: "1rem",
      fontFamily: "Nunito Sans",
      lineHeight: 2,
      flex: 1,
    },
    warning: {
      color: "#f4ca64",
    },
  })
);

interface IProps {
  currentRoute: IRoute;
}

const ResponsiveDrawer: FunctionComponent<IProps> = ({ currentRoute }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerContent = (
    <div>
      <UserControl />
      {LINK_LIST.map((list, index) => (
        <Fragment key={`drawer-link-list-${index}`}>
          <Divider />
          <List>
            {list.map((link) => (
              <ListItem
                button
                key={link.name}
                component={Link}
                to={link.path}
                selected={link.path === currentRoute.path}
                classes={{ root: classes.listItem, selected: classes.listItemSelected }}
              >
                <span className={classes.listItemText}>{link.name}</span>
                {link.wip && <ErrorIcon className={classes.warning} />}
              </ListItem>
            ))}
          </List>
        </Fragment>
      ))}
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      {currentRoute.appBarTitle && (
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.appBarTitle} variant="h6" noWrap>
              {currentRoute.appBarTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {DrawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {DrawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </Fragment>
  );
};

export default ResponsiveDrawer;
