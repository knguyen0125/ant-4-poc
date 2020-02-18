import { sortBy } from "lodash";
import { pathToRegexp } from "path-to-regexp";

const recursivelyRebuiltPath = (routes, route, currentPath) => {
  if (route.parentId === null) return `/${route.path}${currentPath}`;

  const parentRoute = routes.find(r => r.id === route.parentId);
  if (!parentRoute) return `/${route.path}${currentPath}`;

  return recursivelyRebuiltPath(
    routes,
    parentRoute,
    `/${route.path}${currentPath}`
  );
};

export const rebuildPath = routes => {
  return routes.map(route => ({
    ...route,
    path: recursivelyRebuiltPath(routes, route, "")
  }));
};

const recursivelyGenerateMenu = (routes, rootRoute) => {
  const childRoutes = routes.filter(route => route.parentId === rootRoute.id);

  if (childRoutes.length > 0) {
    if (!rootRoute.subRoutes) {
      rootRoute.subRoutes = [];
    }

    childRoutes.forEach(childRoute => {
      if (!rootRoute.subRoutes.some(c => c.id === childRoute.id)) {
        rootRoute.subRoutes.push(recursivelyGenerateMenu(routes, childRoute));
      }
    });

    rootRoute.subRoutes = sortBy(rootRoute.subRoutes, ["order", "id"]);
  }

  return rootRoute;
};

export const generateMenu = routes => {
  return routes
    .filter(route => !route.parentId)
    .map(route => recursivelyGenerateMenu(routes, route));
};

export const getDefaultOpenKeys = (routes, path) => {
  let currentRoute = routes.find(route => pathToRegexp(route.path).exec(path));
  const openKeys = [];

  while (currentRoute) {
    const parentRoute = routes.find(
      // eslint-disable-next-line no-loop-func
      route => currentRoute && route.id === currentRoute.parentId
    );

    if (!parentRoute) break;

    openKeys.push(parentRoute.path);

    currentRoute = parentRoute;
  }

  return openKeys;
};
