import {
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { UserTypes } from "../../redux/models/User";
import { brandSelector } from "../../redux/selectors/index";
import FollowButton from "./FollowButton";
interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  media: {
    position: "relative",
    height: 240,
    backgroundSize: "200% 200%",
    "&:after": {
      content: "' '",
      display: "block",
      position: "absolute",
      backgroundImage:
        "linear-gradient(145deg,#00a0e388 0%,#d82a9088 100%)!important",
      height: 240,
      zIndex: "2",
      width: "100%",
    },
  },
  brandImage: {
    height: 80,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",

    marginRight: theme.spacing(2),
    "&>img": {
      padding: theme.spacing(0.5),
      height: 70,
      objectFit: "contain",
      width: 70,
      border: "2px solid #EEE",
      borderRadius: "0.5em",
    },
  },
}));
const BrandPreview = (props: Props) => {
  const classes = useStyles();
  const user = useAuthUser();
  const { id } = useParams<any>();
  const history = useHistory();
  let brand = useSelector(brandSelector(id));
  if (!brand) {
    if (user && user.role === UserTypes.Brand) {
      brand = user;
    } else {
      history.replace("/404");
    }
  }

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={brand?.avatar}
        title={brand?.name}
      />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <div className={classes.brandImage}>
              <img src={brand?.avatar} alt={brand?.name} />
            </div>
            <Typography variant="h3" component="h4">
              {brand?.name}
            </Typography>
          </Box>
          <Box justifySelf="flex-end">
            <FollowButton brand={brand} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BrandPreview;
