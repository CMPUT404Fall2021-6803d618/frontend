import React, { FC } from "react";
import Stack from "@mui/material/Stack";

const ListContainer: FC = ({ children }) => (
  <Stack spacing={1} sx={{ margin: 1, paddingTop: 1 }}>
    {children}
  </Stack>
);

export default ListContainer;
