import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Icon,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { signupAction } from "../../redux/actions";
import { UserTypes } from "../../redux/models/User";
import { useDispatch } from "react-redux";

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
  uploadButton: {
    height: 100,
    width: "100%",
    border: "3px dashed #ccc",
  },
  logoPreview: {
    objectFit: "contain",
  },
  removeImageButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [selectedForm, setSelectedForm] = useState(0);
  const [logo, setLogo] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<any>, newValue: any) => {
    setSelectedForm(newValue);
  };

  const handleFileChange = (event: React.ChangeEvent<any>) => {
    const dataurl = URL.createObjectURL(event.target.files[0]);
    setLogo(dataurl as string);
  };
  const handleRemoveLogo = async (event: React.MouseEvent<any>) => {
    setLogo(null);
  };

  const handleSignup = (event: any) => {
    event?.stopPropagation();
    event?.preventDefault();
    let payload: any = {
      email: event?.target?.elements.email.value,
      password: event?.target?.elements.password.value,
    };

    if (selectedForm === 0) {
      payload = {
        ...payload,
        firstName: event?.target?.elements.firstName.value,
        lastName: event?.target?.elements.lastName.value,
        role: UserTypes.User,
      };
    } else {
      payload = {
        ...payload,
        role: UserTypes.Brand,
        name: event?.target?.elements.brandName.value,
        brandSymbol: event?.target?.elements.brandSymbol.value,
        maxPoints: parseInt(event?.target?.elements.maxPoints.value),
        avatar: logo,
      };
    }

    dispatch(signupAction(payload));
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

          <form className={classes.form} onSubmit={handleSignup}>
            <Grid container spacing={2}>
              {selectedForm === 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="brandName"
                      label="Brand Name"
                      name="brandName"
                      autoComplete="brand-name"
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="brandSymbol"
                      label="Brand Symbol"
                      name="brandSymbol"
                      autoComplete="brand-symbol"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      height="100%"
                      display="flex"
                      position="relative"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      {logo ? (
                        <>
                          <img
                            width="130"
                            height="130"
                            src={logo}
                            className={classes.logoPreview}
                            alt="avatar"
                          />
                          <IconButton
                            className={classes.removeImageButton}
                            onClick={handleRemoveLogo}
                          >
                            <Icon>clear</Icon>
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="contained-button-file"
                            multiple
                            onChange={handleFileChange}
                            type="file"
                          />
                          <label htmlFor="contained-button-file">
                            <Button
                              variant="outlined"
                              component="span"
                              className={classes.uploadButton}
                            >
                              Upload Brand Logo
                            </Button>
                          </label>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, max: 5000 } }}
                      id="maxPoints"
                      label="Max Loyalty points"
                      name="maxPoints"
                      autoComplete="brand-name"
                      autoFocus
                    />
                  </Grid>
                </>
              )}

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
        </div>
      </Grid>
    </Grid>
  );
}
