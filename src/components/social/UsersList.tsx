import React, { FC, MouseEvent, useCallback } from "react";
import Stack from "@mui/material/Stack";

const UsersList: FC = ({ children }) => (
  <Stack spacing={1} sx={{ margin: 1 }}>
    {children}
  </Stack>
);

export default UsersList;
