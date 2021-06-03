import {
  Box,
  Button,
  Collapse,
  createStyles,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../redux/models/User";
import { brandFollowersSelector } from "../../redux/selectors/index";
import AwardDialog from "./AwardDialog";
import FollowerCard from "./FollowerCard";

interface Props {
  selected?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    usersContainer: {
      marginTop: theme.spacing(1),
    },
  })
);

const Followers: React.FC<Props> = (props) => {
  const classes = useStyles();
  const followers = useSelector(brandFollowersSelector);
  const [selectedFollowersIds, setSelectedFollowersIds] = useState<string[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [snackbarText, setSnackbartext] = useState(
    "Select multiple Users to award in Bulk!"
  );

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleSelect = (id: string) => (value: boolean) => {
    setSelectedFollowersIds((sf: string[]) => {
      if (!value) {
        return sf.filter((value) => value !== id);
      } else {
        return [...sf, id];
      }
    });
  };
  const clearSelection = () => {
    setSelectedFollowersIds([]);
  };
  const handleFollowerAwardClick = (user: User) => {
    setSelectedFollowersIds([user.id]);
    setOpen(true);
  };
  const selectedFollowers = useMemo(() => {
    return followers.filter((user: User, index) =>
      selectedFollowersIds.includes(user.id)
    );
  }, [followers, selectedFollowersIds]);
  const handleAwardClose = (event:any, reason:string) => {
    if( reason && reason.includes("users rewarded") ){
      setSnackbartext(reason);
      setSnackbarOpen(true);
    }
    setOpen(false);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Followers</Typography>
      </Box>
      <Collapse in={!!selectedFollowersIds.length}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Award Loyalty Points ({selectedFollowersIds.length} Users)
        </Button>
        <IconButton onClick={clearSelection}>
          <Icon>clear</Icon>
        </IconButton>
      </Collapse>
      <Grid container spacing={2} className={classes.usersContainer}>
        {followers.map((user, index) => (
          <Grid item xs={12} md={4} key={user.id}>
            <FollowerCard
              onAwardClick={handleFollowerAwardClick}
              onCheckChanged={handleSelect(user.id)}
              selected={selectedFollowersIds.includes(user.id)}
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
        message={snackbarText}
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
        onClose={handleAwardClose}
      />
    </>
  );
};
export default Followers;
