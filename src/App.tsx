import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch as RouterSwitch, Redirect } from "react-router-dom";
import "./App.css";
import Followers from "./components/brands/Followers";
import Brands from "./components/user/Brands";
import SignUp from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
import { ConnectedRouter } from "connected-react-router";

// import UserList from "./components/UserList";
import { userFetchAction } from "./redux/actions";
import { history } from "./redux";
import BrandPreview from "./components/user/BrandPreview";
import PrivateRoute from "./components/router/PrivateRoute";
import { UserTypes } from "./redux/models/User";
import NotFoundComponent from "./components/general/NotFoundComponent";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userFetchAction());
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <RouterSwitch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute
          roles={[UserTypes.User]}
          exact
          path="/brands"
          component={Brands}
        />
        <PrivateRoute
          roles={[UserTypes.User]}
          path="/brand/:id"
          component={BrandPreview}
        />

        <PrivateRoute
          roles={[UserTypes.Brand]}
          exact
          path="/followers"
          component={Followers}
        />
        <Redirect exact from="/" to="/signin" />
        <Route component={NotFoundComponent} />
      </RouterSwitch>
    </ConnectedRouter>
  );
}

export default App;
