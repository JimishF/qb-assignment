import React from "react";
import { Box, Typography } from "@material-ui/core";
const NotFoundComponent = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography component="h1" color="primary" variant="h1">
        404
      </Typography>
    </Box>
  );
};

export default NotFoundComponent;
