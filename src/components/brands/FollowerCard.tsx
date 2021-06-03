import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { User } from "../../redux/models/User";
import CoinSvgIcon from "../general/CoinSvgIcon";
import IconTypography from "../general/IconTypography";
interface Props {
  user: User;
  selected: boolean;
  onCheckChanged?: Function;
  onAwardClick?: Function;
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
  })
);
const FollowerCard: React.FC<Props> = ({
  user,
  selected,
  onCheckChanged,
  onAwardClick,
}: Props) => {
  const classes = useStyles({ selected });
  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onCheckChanged && onCheckChanged(!selected);
  };
  const handleAwardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onAwardClick && onAwardClick(user);
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
            <img src={user.avatar} alt={user.firstName} />
          </div>
          <Typography gutterBottom className={classes.userName}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <IconTypography variant="subtitle1" startIcon={<CoinSvgIcon />}>
            {user.credits}
          </IconTypography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          onClick={handleAwardClick}
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
