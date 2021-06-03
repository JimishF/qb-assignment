import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import React from "react";
import { User } from "../../redux/models/User";
import { ReactComponent as CoinIcon } from "../../icons/coin.svg";

interface Props {
  user: User;
  selected: boolean;
  onCheckChanged?: Function;
}

const useStyles = makeStyles<Theme, Partial<Props>>((theme: Theme) =>
  createStyles({
    userCard: {
      padding: theme.spacing(1),
      boxSizing: "border-box",
      transition: "all .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
      border: ({ selected }) =>
        selected ? `5px solid ${theme.palette.primary.light}` : "none",
      transform: ({ selected }) =>
        selected ? "translateZ(2px) scale3d(0.98, 0.98, 0.98)" : "none",
      borderRadius: "1em",
      "&:hover": {
        cursor: "pointer",
        boxShadow: `0 2px 2px rgba(0, 0, 0, 0.03),
        0 8px 5px rgba(0, 0, 0, 0.04),
        5px 12px 18px rgba(0, 0, 0, 0.08)`,
      },
    },
    userImage: {
      "&>img": {
        padding: theme.spacing(1),
        height: 70,
        objectFit: "contain",
        width: 70,
        border: "2px solid #EEE",
        borderRadius: "50%",
      },
    },
    userName: {
      fontWeight: 700,
    },

    followButton: {
      boxShadow: "none",
      borderRadius: "1em",
    },
    sectionTitle: {
      marginTop: theme.spacing(6),
    },
    wrapIcon: {
      verticalAlign: "middle",
      display: "inline-flex",
    },
    coinSvg: {
      height: 28,
      width: 28,
      marginLeft: theme.spacing(1),
    },
  })
);
const FollowerCard: React.FC<Props> = ({
  user,
  selected,
  onCheckChanged,
}: Props) => {
  const classes = useStyles({ selected });
  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onCheckChanged && onCheckChanged(!selected);
  };
  return (
    <Card onClick={handleCardClick} className={classes.userCard}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.userImage}>
            <img src={user.avatar} alt={user.name} />
          </div>
          <Typography gutterBottom className={classes.userName}>
            {user.name}
          </Typography>

          <Typography variant="subtitle1" className={classes.wrapIcon}>
            3000
            <SvgIcon
              component={CoinIcon}
              className={classes.coinSvg}
              viewBox="0 0 350 350"
            />
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          onClick={(event) => event.stopPropagation()}
          variant="contained"
          type="submit"
          color="primary"
          className={classes.followButton}
        >
          Award Loyalty Points
        </Button>
      </CardActions>
    </Card>
  );
};

export default FollowerCard;
