import React, { useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { reverse, sortBy } from "lodash";
import loadable from "@loadable/component";

import routeMap from "./routeMap";

const NotFound = loadable(() => import("../../../views/Exceptions/NotFound"));
const ServerError = loadable(() =>
  import("../../../views/Exceptions/ServerError")
);
const Unauthorized = loadable(() =>
  import("../../../views/Exceptions/Unauthorized")
);

const SwitchBoard = ({ routes }) => {
  const sortedRoutes = useMemo(
    () => reverse(sortBy(routes, route => route.path.length)),
    [routes]
  );

  return (
    <Switch>
      {sortedRoutes.map(route => {
        let Component = routeMap[route.component];
        const PathRoute = Route;

        if (!Component) {
          Component = NotFound;
        }

        return (
          <PathRoute key={route.path} path={route.path} exact={route.isExact}>
            <Component />
          </PathRoute>
        );
      })}

      <Route path="/exceptions/500" exact>
        <ServerError />
      </Route>
      <Route path="/exceptions/404" exact>
        <NotFound />
      </Route>
      <Route path="/exceptions/403" exact>
        <Unauthorized />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default SwitchBoard;
