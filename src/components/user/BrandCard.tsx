import {
  Avatar,
  Box, Card,
  CardActions,
  CardContent,
  createStyles, makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React from "react";
import { useHistory } from "react-router-dom";
import CoinSvgIcon from "../general/CoinSvgIcon";
import IconTypography from "../general/IconTypography";
import FollowButton from './FollowButton'
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
  })
);

const BrandCard = ({ brand }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleRedirect = () => {
    history.push(`/brand/${brand.id}`);
  };

  return (
    <Card className={classes.brandCard} onClick={handleRedirect}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <div className={classes.brandImage}>
            <img src={brand.avatar} alt={brand.name} />
          </div>

          <IconTypography variant="subtitle1" startIcon={<CoinSvgIcon />}>
            3000
          </IconTypography>
        </Box>
        <Typography className={classes.brandName}>{brand.name}</Typography>

        <Box mt={4}>
          <AvatarGroup>
            {[...new Array(5)].map((_, index) => (
              <Avatar
                key={index}
                className={classes.smallAvatar}
                alt="User"
                src={`/images/users/${index}.jpeg`}
              />
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
      <CardActions>
        <FollowButton brand={brand} />
      </CardActions>
    </Card>
  );
};

export default BrandCard;
