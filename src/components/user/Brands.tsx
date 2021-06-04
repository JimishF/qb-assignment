import {
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import brands from "../../rawData/brands.json";
import { followingBrandsSelector } from "../../redux/selectors/index";
import SearchBar from "../general/SearchBar";
import BrandCard from "./BrandCard";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandsContainer: {
      marginTop: theme.spacing(4),
    },
  })
);
const Brands: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchvalue] = useState("");
  const [toFilterFollowing, setToFilterFollowing] = useState(false);
  const followingBrands = useSelector(followingBrandsSelector);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchvalue(event?.target?.value);
  };

  const filteredBrands = useMemo(() => {
    const targetBrands: Array<any> | undefined = toFilterFollowing
      ? followingBrands
      : brands;
    if (targetBrands?.length) {
      return (
        targetBrands?.filter((brand) =>
          brand.name.toLowerCase().includes(searchValue.toLowerCase())
        ) ?? []
      );
    }
    return [];
  }, [searchValue, toFilterFollowing, followingBrands]);

  const handleFollowingFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToFilterFollowing(event.target.checked);
  };

  return (
    <>
      <SearchBar placeholder="Search Brands" onChange={handleSearchChange} />

      <FormControlLabel
        control={
          <Switch
            checked={toFilterFollowing}
            onChange={handleFollowingFilterChange}
            name="checkedA"
          />
        }
        label="Only Show brands you follow"
      />
      <Grid container spacing={2} className={classes.brandsContainer}>
        {filteredBrands.map((brand, index) => (
          <Grid item xs={12} md={4} sm={6} key={index}>
            <BrandCard brand={brand} />
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
    </>
  );
};
export default Brands;
