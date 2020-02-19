import React, { useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { reverse, sortBy } from "lodash";
import loadable from "@loadable/component";

import routeMap from "./routeMap";
import DefaultLayout from "../../../layout/DefaultLayout";
import Login from "../../../views/WebAuthentication/Login";
import PrivateRoute from "../PrivateRoute";
import { useSelector } from "react-redux";
import { menuSelector } from "../../../store/modules/menu";

const NotFound = loadable(() => import("../../../views/Exceptions/NotFound"));
const ServerError = loadable(() =>
  import("../../../views/Exceptions/ServerError")
);
const Unauthorized = loadable(() =>
  import("../../../views/Exceptions/Unauthorized")
);

const SwitchBoard = () => {
  const sortedRoutes = useSelector(menuSelector);

  return (
    <Switch>
      {sortedRoutes.map(route => {
        let Component = routeMap[route.component];
        const PathRoute = route.isPrivate ? PrivateRoute : Route;

        if (!Component) {
          Component = NotFound;
        }

        return (
          <PathRoute key={route.path} path={route.path} exact={route.isExact}>
            <DefaultLayout>
              <Component />
            </DefaultLayout>
          </PathRoute>
        );
      })}
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/exceptions/500" exact>
        <DefaultLayout>
          <ServerError />
        </DefaultLayout>
      </Route>
      <Route path="/exceptions/404" exact>
        <DefaultLayout>
          <NotFound />
        </DefaultLayout>
      </Route>
      <Route path="/exceptions/403" exact>
        <DefaultLayout>
          <Unauthorized />
        </DefaultLayout>
      </Route>
      <Route path="*">
        <DefaultLayout>
          <NotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
};

export default SwitchBoard;
