import React, {
  Fragment,
  FunctionComponent,
  useState,
  useCallback,
} from "react";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import UserControl from "./UserControl";
import { LINK_LIST } from "router/drawerLinks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flex: 0,
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
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
      color: theme.palette.colors.black,
      backgroundColor: theme.palette.secondary.main + "!important",
      "&:hover": {
        color: theme.palette.colors.black,
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
        <Hidden smDown implementation="css">
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
