import React, { ReactElement } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { UserTypes } from "../../redux/models/User";
import Wrapper from "../general/Wrapper";

interface PrivateRouteProps extends RouteProps {
  roles: UserTypes[];
}

function PrivateRoute({
  roles,
  component: Component,
  ...routeProps
}: PrivateRouteProps): ReactElement {
  //   const currentUser = useSelector(authUser);
  const currentUser = useAuthUser();
  const authUserRole = currentUser?.role ?? UserTypes.Unavaliable;
  console.log(authUserRole);
  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        } else if (currentUser && roles && roles.indexOf(authUserRole) === -1) {
          return <Redirect to={{ pathname: "/signin" }} />;
        }

        // component with wrapper
        return <Wrapper>{Component ? <Component {...props} /> : null}</Wrapper>;
      }}
    />
  );
}

export default PrivateRoute;
