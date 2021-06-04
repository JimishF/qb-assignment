import {
  AppBar,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Hidden,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { UserTypes } from "../../redux/models/User";
import CoinSvgIcon from "../general/CoinSvgIcon";
import IconTypography from "../general/IconTypography";

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
    avatar: {
      marginRight: theme.spacing(2),
    },
    credits: {
      marginRight: theme.spacing(2),
    },
  })
);
const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const user = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    history.push("/signin");
  };

  const userName = user.role === UserTypes.Brand ? user.name : user.firstName;
 
 
  // Routing patch
  const URLS = ["/followers", `/brand/${user.id}`];
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: any) => {
    user.role === UserTypes.Brand && history.push(URLS[newValue] ?? "/followers");
  };
  useEffect(() => {
    setValue(value !== 1 && location.pathname === `/brand/${user.id}` ? 1 : 0);
  }, [location, setValue]);

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Box display="flex" justifyContent="space-between">
            <Hidden smDown>
              <Box flex={1}>
                <Toolbar variant="dense">
                  <Avatar src={user.avatar} className={classes.avatar} />
                  <Typography color="inherit">Welcome {userName}!</Typography>
                </Toolbar>
              </Box>
            </Hidden>
            <Box flex={2}>
              <Tabs
                centered
                value={value}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tooltip title="Home">
                  <Tab value={0} icon={<Icon>home</Icon>} />
                </Tooltip>
                {user.role === UserTypes.Brand ? (
                  <Tooltip title="My Profile">
                    <Tab value={1} icon={<Icon>store_front</Icon>} />
                  </Tooltip>
                ) : (
                  <Tab value={2} disabled icon={<Icon>store_front</Icon>} />
                )}
              </Tabs>
            </Box>
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <IconTypography
                className={classes.credits}
                variant="subtitle1"
                startIcon={<CoinSvgIcon />}
              >
                {3000}
              </IconTypography>
            </Box>

            <div>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Icon>menu</Icon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Box>
        </AppBar>
        <Container maxWidth="md">
          <main className={classes.content}>{children}</main>
        </Container>
      </div>
    </div>
  );
};
export default Wrapper;
