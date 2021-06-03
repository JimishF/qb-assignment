import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Icon,
  makeStyles,
  SvgIcon,
  Theme,
  Typography,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as CoinIcon } from "../../icons/coin.svg";

interface Props {
  brand: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandCard: {
      padding: theme.spacing(1),
      borderRadius: "1em",
      "&:hover": {
        boxShadow: `0 2px 2px rgba(0, 0, 0, 0.03),
          0 8px 5px rgba(0, 0, 0, 0.04),
          5px 12px 18px rgba(0, 0, 0, 0.08)`,
        cursor: "pointer",
      },
    },
    brandImage: {
      height: 80,
      width: "100%",
      marginBottom: 0,
      display: "flex",
      alignItems: "center",
      "&>img": {
        padding: theme.spacing(0.5),
        height: 70,
        objectFit: "contain",
        width: 70,
        border: "2px solid #EEE",
        borderRadius: "0.5em",
      },
    },
    brandName: {
      fontWeight: 700,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    smallAvatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    followButton: {
      boxShadow: "none",
      borderRadius: "1em",
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

const BrandCard = ({ brand }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleRedirect = () => {
    history.push(`/brand/${brand.id}`);
  };
  const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
  };
  return (
    <Card className={classes.brandCard} onClick={handleRedirect}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <div className={classes.brandImage}>
            <img src={brand.image} alt={brand.name} />
          </div>

          <Typography variant="subtitle1" className={classes.wrapIcon}>
            3000
            <SvgIcon
              component={CoinIcon}
              className={classes.coinSvg}
              viewBox="0 0 350 350"
            />
          </Typography>
        </Box>
        <Typography className={classes.brandName}>{brand.name}</Typography>

        <Box mt={4}>
          <AvatarGroup>
            {[...new Array(5)].map((_, index) => (
              <Avatar
                key={index}
                className={classes.smallAvatar}
                alt="User"
                src={`https://i.pravatar.cc/50?${index}`}
              />
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          color="secondary"
          className={classes.followButton}
          endIcon={<Icon>add</Icon>}
          onClick={handleFollow}
        >
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};

export default BrandCard;
