import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  TypographyProps,
} from "@material-ui/core";
import clsx from 'clsx';
import React, { ReactElement } from "react";
interface Props extends TypographyProps {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  iconHeight?: number | string;
  iconWidth?: number | string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapIcon: {
      verticalAlign: "middle",
      display: "inline-flex",
    },
    iconBox: {
      display:"flex",
      alignSelf: "center"
    }
  })
);
const IconTypography: React.FC<Props> = ({
  children,
  startIcon,
  endIcon,
  iconHeight="100%",
  iconWidth="auto",
  className,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Typography className={clsx(classes.wrapIcon, className)} {...rest} display="initial">
      {startIcon ? (
        <Box height={iconHeight} className={classes.iconBox} mr={1}>
          {startIcon}
        </Box>
      ) : null}
      {children}
      {endIcon ? (
        <Box height={iconWidth} className={classes.iconBox} ml={1}>
          {endIcon}
        </Box>
      ) : null}
    </Typography>
  );
};

export default IconTypography;
