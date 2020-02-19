import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { getDefaultOpenKeys } from "../utils";
import { useSelector } from "react-redux";
import { menuSelector, treeMenuSelector } from "../../../store/modules/menu";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Navbar = ({
  collapsible,
  collapsed,
  onCollapse,
  collapsedWidth,
  breakpoint,
  onBreakpoint
}) => {
  const treeRoute = useSelector(treeMenuSelector);
  const flatRoute = useSelector(menuSelector);
  const { pathname } = useLocation();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(null);

  // Getting default open keys is computationally intensive, and we only need to run it once when screen first start up
  useEffect(() => {
    setDefaultOpenKeys(getDefaultOpenKeys(flatRoute, pathname));
  }, [flatRoute, pathname]);

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
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
      >
        {treeRoute.map(route => recursivelyGenerateMenuItems(route))}
      </Menu>
    </Sider>
  );
};

export default Navbar;
