import {
  Box,
  Button,
  Collapse,
  createStyles,
  Grid,
  Snackbar,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { fakeUser, User } from "../../redux/models/User";
import CoinSvgIcon from "../general/CoinSvgIcon";
import AwardDialog from "./AwardDialog";
import FollowerCard from "./FollowerCard";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    usersContainer: {
      marginTop: theme.spacing(1),
    },
  })
);
interface SelectableUser extends User {
  selected?: boolean;
}
const Followers: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [followers] = useState<SelectableUser[]>([
    { ...fakeUser },
    { ...fakeUser },
  ]);

  const [selectedFollowersIndexes, setSelectedFollowersIndexes] = useState<
    number[]
  >([]);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleSelect = (index: number) => (value: boolean) => {
    setSelectedFollowersIndexes((sf: number[]) => {
      if (!value) {
        return sf.filter((value) => value !== index);
      } else {
        return [...sf, index];
      }
    });
  };
  const clearSelection = () => {
    setSelectedFollowersIndexes([]);
  };
  const selectedFollowers = useMemo(() => {
    return followers.filter((_, index) =>
      selectedFollowersIndexes.includes(index)
    );
  }, [followers, selectedFollowersIndexes]);
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Followers</Typography>
      
      </Box>
      <Collapse in={!!selectedFollowersIndexes.length}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Award Loyalty Points ({selectedFollowersIndexes.length} Users)
        </Button>
        <IconButton onClick={clearSelection}>
          <Icon>clear</Icon>
        </IconButton>
      </Collapse>
      <Grid container spacing={2} className={classes.usersContainer}>
        {followers.map((user, index) => (
          <Grid item xs={12} md={4} key={index}>
            <FollowerCard
              onCheckChanged={handleSelect(index)}
              selected={selectedFollowersIndexes.includes(index)}
              user={user}
            />
          </Grid>
        ))}

        {followers.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary">
              No Followers Yet.
            </Typography>
          </Grid>
        ) : null}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Select multiple Users to award in Bulk!"
        action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Icon>close</Icon>
            </IconButton>
        }
      />
      <AwardDialog
        selectedUsers={selectedFollowers}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default Followers;
