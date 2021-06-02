import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  Icon,
  makeStyles,
  Theme,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React, { useMemo, useState } from "react";
import brands from "../../rawData/brands.json";
import { fakeUser } from "../../redux/models/User";
import SearchBar from "../general/SearchBar";
import Wrapper from "../general/Wrapper";
import { ReactComponent as CoinIcon } from "../../icons/coin.svg";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandCard: {
      padding: theme.spacing(1),
      borderRadius: "1em",
      "&:hover": {
        boxShadow: `0 2px 2px rgba(0, 0, 0, 0.03),
        0 8px 5px rgba(0, 0, 0, 0.04),
        5px 12px 18px rgba(0, 0, 0, 0.08)`,
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
    brandsContainer: {
      marginTop: theme.spacing(4),
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
const Brands: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchvalue] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchvalue(event?.target?.value);
  };
  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );
  return (
    <Wrapper authUser={fakeUser}>
      <SearchBar placeholder="Search Brands" onChange={handleSearchChange} />

      <Grid container spacing={2} className={classes.brandsContainer}>
        {filteredBrands.map((brand, index) => (
          <Grid item xs={12} md={4} sm={6} key={index}>
            <Card className={classes.brandCard}>
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
                <Typography className={classes.brandName}>
                  {brand.name}
                </Typography>

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
                >
                  Follow
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filteredBrands.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary">
              No brands found
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    </Wrapper>
  );
};
export default Brands;
