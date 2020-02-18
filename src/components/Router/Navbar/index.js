import React, {useMemo, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { sortBy } from "lodash";
import {generateMenu, getDefaultOpenKeys} from "../utils";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Navbar = ({
  routes,
  collapsible,
  collapsed,
  onCollapse,
  collapsedWidth,
  breakpoint,
  onBreakpoint
}) => {
  const sortedRoutes = useMemo(() => sortBy(generateMenu(routes), ["order", "id"]), [routes]);
  const { pathname } = useLocation();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(null);

  // Getting default open keys is computationally intensive, and we only need to run it once when screen first start up
  useEffect(() => {
    setDefaultOpenKeys(getDefaultOpenKeys(routes, pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!defaultOpenKeys) return null;

  const recursivelyGenerateMenuItems = route => {
    if (route.isHidden) return null;

    if (route.subRoutes && route.subRoutes.length > 0) {
      return (
        <SubMenu
          key={route.path}
          title={
            <span>
              <span>{route.title}</span>
            </span>
          }
        >
          {route.subRoutes.map(childRoute =>
            recursivelyGenerateMenuItems(childRoute)
          )}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={route.path}>
        <span>{route.title}</span>
        <Link to={route.path} />
      </Menu.Item>
    );
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsedWidth={collapsedWidth}
      breakpoint={breakpoint}
      onBreakpoint={onBreakpoint}
    >
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={defaultOpenKeys} mode="inline">
        {sortedRoutes.map(route => recursivelyGenerateMenuItems(route))}
      </Menu>
    </Sider>
  );
};

export default Navbar;
