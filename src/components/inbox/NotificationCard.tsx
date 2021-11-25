/* eslint-disable @typescript-eslint/ban-types */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";
import Button from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { Typography } from "@mui/material";

interface NotificationCardProps {
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  buttons: {
    text: string;
    onClick: () => void;
    variant?: "text" | "outlined" | "contained";
  }[];
  index: number;
}

const NotificationCard: FC<NotificationCardProps> = (props) => {
  const { text, Icon, buttons, index } = props;
  return (
    <Card
      sx={{
        width: "100%",
        p: 1,
        paddingLeft: 2,
        typography: "body2",
      }}
    >
      <Grid container spacing={0} alignItems="center">
        <Grid xs sm>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon sx={{ marginRight: 1 }} />
            <Typography>{text}</Typography>
          </Stack>
        </Grid>
        <Grid xs sm="auto">
          <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ m: 1 }}>
            {buttons.map(({ text: buttonText, variant, onClick }, buttonIndex) => (
              <Button key={`notif-${index}-${buttonIndex}`} variant={variant} color="primary" onClick={onClick}>
                {buttonText}
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default NotificationCard;
