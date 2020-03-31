import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { useSelector } from '../../../store/hooks';
import { getDefaultOpenKeys } from '../utils';
import { MenuSelectors } from '../../../store/modules/menu';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({
  collapsible,
  collapsed,
  onCollapse,
  collapsedWidth,
  breakpoint,
  onBreakpoint,
}) => {
  const treeRoute = useSelector(MenuSelectors.selectTreeMenu);
  const flatRoute = useSelector(MenuSelectors.selectFlatMenu);
  const { pathname } = useLocation();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(null);

  // Getting default open keys is computationally intensive, and we only need to run it once when screen first start up
  useEffect(() => {
    setDefaultOpenKeys(getDefaultOpenKeys(flatRoute, pathname));
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
            recursivelyGenerateMenuItems(childRoute),
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
