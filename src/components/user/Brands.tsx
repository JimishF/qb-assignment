import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import brands from "../../rawData/brands.json";
import { fakeUser } from "../../redux/models/User";
import SearchBar from "../general/SearchBar";
import Wrapper from "../general/Wrapper";
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
    </Wrapper>
  );
};
export default Brands;
