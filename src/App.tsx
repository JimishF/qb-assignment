import React from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  Switch as RouterSwitch,
} from "react-router-dom";
import "./App.css";
import Followers from "./components/brands/Followers";
import Brands from "./components/user/Brands";
import SignUp from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
import { ConnectedRouter } from 'connected-react-router'

// import UserList from "./components/UserList";
import { userFetchAction } from "./redux/actions";
import { history } from "./redux";

function App() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userFetchAction());
  };
  return (
      <ConnectedRouter history={history}>
        <RouterSwitch>
          <Route exact path="/" component={Brands} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/brand/followers" component={Followers} />
        </RouterSwitch>
      </ConnectedRouter>
  );
}

export default App;
