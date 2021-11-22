import React, { FC, MouseEvent, useCallback } from "react";
import Stack from "@mui/material/Stack";

const UsersList: TC = ({ children }) => (
  <Stack spacing={1} sx={{ margin: 1 }}>
    {children}
  </Stack>
);

export default UsersList;
