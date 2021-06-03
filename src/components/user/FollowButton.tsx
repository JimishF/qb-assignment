import {
  Button,
  createStyles,
  Icon,
  makeStyles,
  Theme
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";

interface Props {
  brand: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    followButton: {
      boxShadow: "none",
      borderRadius: "1em",
    },
  })
);

const FollowButton = (props: Props) => {
  const user = useAuthUser();
  
  const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    setFollowing((f) => !f);
  };

  const [following, setFollowing] = useState(false);
  const classes = useStyles();
  return (
    <Button
      fullWidth
      variant={following ? "outlined" : "contained"}
      type="submit"
      color="secondary"
      className={classes.followButton}
      startIcon={following ? <Icon>done</Icon> : <Icon>add</Icon>}
      onClick={handleFollow}
    >
      {following ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
