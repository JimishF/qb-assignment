import {
  AppBar,
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
  Tooltip,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
    credits: {
      marginRight: theme.spacing(2),
    },
  })
);
const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Box display="flex" justifyContent="space-between">
            <Hidden smDown>
              <Box flex={1}> </Box>
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
                  <Tab icon={<Icon>home</Icon>} />
                </Tooltip>
                <Tooltip title="Brands">
                  <Tab icon={<Icon>shopping_bag</Icon>} />
                </Tooltip>
                <Tooltip title="Following">
                  <Tab icon={<Icon>storefront</Icon>} />
                </Tooltip>
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
                3000
              </IconTypography>
            </Box>

            <div>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Icon>account_circle</Icon>
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
