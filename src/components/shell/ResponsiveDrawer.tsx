import React, {
  Fragment,
  FunctionComponent,
  useState,
  useCallback,
} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import UserControl from "./UserControl";
import { LINK_LIST } from "router/drawerLinks";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ErrorIcon from "@material-ui/icons/Error";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flex: 1,
        flexShrink: 0,
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      position: "relative",
      borderRight: "none",
      [theme.breakpoints.up("sm")]: {
        marginLeft: "auto",
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listItem: {
      width: "auto",
      color: theme.palette.text.primary,
      margin: "8px",
      borderRadius: "5px",
      "&:hover": {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary,
      },
    },
    listItemSelected: {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main + "!important",
      "&:hover": {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.main + "!important",
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
  currentUrl: string;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const ResponsiveDrawer: FunctionComponent<IProps> = ({
  currentUrl,
  onDrawerToggle,
  mobileOpen,
}) => {
  const classes = useStyles();
  const theme = useTheme();

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
                selected={
                  link.subpath
                    ? link.subpath.includes(currentUrl)
                    : link.path === currentUrl
                }
                classes={{
                  root: classes.listItem,
                  selected: classes.listItemSelected,
                }}
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
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={onDrawerToggle}
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
