import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Box,
  Typography,
  SvgIcon,
  Button,
  Collapse,
  Icon,
  IconButton,
} from "@material-ui/core";
import React, { useState, useMemo } from "react";
import { fakeUser, User } from "../../redux/models/User";
import Wrapper from "../general/Wrapper";
import FollowerCard from "./FollowerCard";
import { ReactComponent as CoinIcon } from "../../icons/coin.svg";
import AwardDialog from "./AwardDialog";

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
  const [followers, setFollowers] = useState<SelectableUser[]>([
    { ...fakeUser },
    { ...fakeUser },
  ]);

  const [selectedFollowersIndexes, setSelectedFollowersIndexes] = useState<
    number[]
  >([]);
  const [open, setOpen] = useState(false);

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
  const credits = 500;
  return (
    <Wrapper authUser={fakeUser}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Followers</Typography>
        <Button
          size="large"
          startIcon={<SvgIcon component={CoinIcon} viewBox="0 0 350 350" />}
        >
          {credits} Credits
        </Button>
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
      <AwardDialog
        selectedUsers={selectedFollowers}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Wrapper>
  );
};
export default Followers;
