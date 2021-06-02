import {
  createStyles,
  makeStyles,
  Theme,
  IconButton,
  Paper,
  Icon,
  InputBase,
  InputBaseProps,
} from "@material-ui/core";
import React from "react";

interface Props extends InputBaseProps {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      width: "100%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);
const SearchBar: React.FC<Props> = ( props : Props) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        {...props}
        className={classes.input}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <Icon>search</Icon>
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
