import {
  Button,
  createStyles,
  Icon,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followBrand, unfollowBrand } from "../../redux/actions";
import { isFollowingBrand } from "../../redux/selectors";

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

const FollowButton = ({ brand }: Props) => {
  const dispatch = useDispatch();
  const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    if (following) {
      dispatch(unfollowBrand(brand));
    } else {
      dispatch(followBrand(brand));
    }
  };
  const following = useSelector(isFollowingBrand(brand.id));
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
