import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import brands from "../../rawData/brands.json";
import users from "../../rawData/users.json";
import { signinAction } from "../../redux/actions";
import { BrandUser, User, UserTypes } from "../../redux/models/User";

const firstBrandUser = brands[0] as BrandUser;
const firstUser = users[0] as User;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState<User | BrandUser>({
    ...firstBrandUser,
    role: UserTypes.Brand,
  });

  const handleSignin = (event: any) => {
    event?.stopPropagation();
    event?.preventDefault();
    dispatch(signinAction(payload));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === UserTypes.Brand) {
      setPayload({ ...firstBrandUser, role: UserTypes.Brand });
    } else {
      setPayload({ ...firstUser, role: UserTypes.User });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="loginAs"
            name="loginAs"
            row
            value={payload.role}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value={UserTypes.Brand}
              control={<Radio />}
              label={`As Brand (${firstBrandUser.name})`}
            />
            <FormControlLabel
              value={UserTypes.User}
              control={<Radio />}
              label={`As User (${firstUser.firstName})`}
            />
          </RadioGroup>
        </FormControl>

        <form className={classes.form} onSubmit={handleSignin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
            required
            id="email"
            value="email@example.com"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            disabled
            name="password"
            label="Password"
            type="password"
            id="password"
            value="email@example.com"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
