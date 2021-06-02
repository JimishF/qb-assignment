import React, { Component, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { fakeUser, User, UserTypes } from "../../redux/models/User";
import Wrapper from "../general/Wrapper";

interface PrivateRouteProps extends RouteProps {
  roles: UserTypes[];
}

function PrivateRoute({
  roles,
  ...routeProps
}: PrivateRouteProps): ReactElement {
//   const currentUser = useSelector(authUser);
  const currentUser =  fakeUser;

  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        // role auth
        if (roles && roles.indexOf(currentUser?.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />;
        }

        // component with wrapper
        return (
          <Wrapper authUser={currentUser as User}>
            <Component {...props} />
          </Wrapper>
        );
      }}
    />
  );
}

export default PrivateRoute;
