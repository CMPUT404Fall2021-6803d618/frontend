import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

interface StyleProps {
  width?: number;
}

const useStyles = makeStyles({
  fullRoot: {
    borderRadius: "20px 20px 0 0",
  },
  list: {
    width: (props: StyleProps) => props.width ?? 250,
    height: "100%",
  },
  fullList: {
    width: "auto",
    maxHeight: 400,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "20px 20px 0 0",
  },
});

type DrawerSide = "top" | "left" | "bottom" | "right";

interface IProps {
  side: DrawerSide;
  open: boolean;
  width?: number;
  onClose: () => void;
}

const TemporaryDrawer: FunctionComponent<IProps> = ({ side, open, width, children, onClose }) => {
  const classes = useStyles({ width });

  const sideList = () => (
    <div className={classes.list} role="presentation">
      {children}
    </div>
  );

  const fullList = () => (
    <div className={classes.fullList} role="presentation">
      {children}
    </div>
  );

  const displayList = () => {
    if (side === "top" || side === "bottom") {
      return fullList();
    } else {
      return sideList();
    }
  };

  return (
    <Drawer
      anchor={side}
      open={open}
      onClose={onClose}
      classes={{
        paper: side === "top" || side === "bottom" ? classes.fullRoot : undefined,
      }}
    >
      {displayList()}
    </Drawer>
  );
};

export default TemporaryDrawer;
