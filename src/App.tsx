import React from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch as RouterSwitch,
} from "react-router-dom";
import "./App.css";
import Followers from "./components/brands/Followers";
import Brands from "./components/user/Brands";
// import UserList from "./components/UserList";
import { userFetchAction } from "./redux/store/actions";

function App() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userFetchAction());
  };
  return (
    <>
      <Router>
        <RouterSwitch>
          <Route exact path="/" component={Brands} />
          <Route exact path="/brand/followers" component={Followers} />
        </RouterSwitch>
      </Router>
    </>
  );
}

export default App;
