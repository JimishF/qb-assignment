import {
  Avatar,
  Button,
  CssBaseline, Grid, Icon, Link,
  Paper, Tab, Tabs, TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TabPanel from "../general/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "linear-gradient(145deg,#00a0e3 0%,#d82a90 100%)!important",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [selectedForm, setSelectedForm] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setSelectedForm(newValue);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon>lock</Icon>
          </Avatar>

          <Tabs value={selectedForm} onChange={handleChange}>
            <Tab fullWidth label="User Registration" />
            <Tab fullWidth label="Brand Registration" />
          </Tabs>

          <TabPanel value={selectedForm} index={0}>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="first-name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="last-name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link component={RouterLink} to="/signin" variant="body2">
                    {"Already have an account? Sign In "}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </TabPanel>
          <TabPanel value={selectedForm} index={1}>
            <form className={classes.form}></form>
          </TabPanel>
        </div>
      </Grid>
    </Grid>
  );
}
