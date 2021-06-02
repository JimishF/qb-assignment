import {
  AppBar,
  Container,
  CssBaseline,
  Icon,
  Tab,
  Tabs,
  Theme,
  Tooltip,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { User } from "../../redux/models/User";

interface WrapperProps {
  authUser: User;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: "100%",
    },
    content: {
      flexGrow: 1,
      marginTop: "5.5em",
    },
  })
);
const Wrapper: React.FC<WrapperProps> = ({ authUser, children }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Container maxWidth="md">
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tooltip title="Home">
                <Tab icon={<Icon>home</Icon>} />
              </Tooltip>
              <Tooltip title="Brands">
                <Tab icon={<Icon>shopping_bag</Icon>} />
              </Tooltip>
              <Tooltip title="Following">
                <Tab icon={<Icon>storefront</Icon>} />
              </Tooltip>
            </Tabs>
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <main className={classes.content}>{children}</main>
        </Container>
      </div>
    </div>
  );
};
export default Wrapper;
