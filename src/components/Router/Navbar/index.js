import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { useSelector } from '../../../store/hooks';
import { getDefaultOpenKeys } from '../utils';
import { MenuSelectors } from '../../../store/modules/menu';
import { GoGear } from 'react-icons/go';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import Icon from '../../icons/Icon';
import styled from '@emotion/styled';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Wrapper = styled.div`
  height: 100%;

  .ant-menu {
    padding-left: 20px;
    padding-right: 20px;

    & .ant-menu-item,
    .ant-menu-submenu-open {
      border-radius: 4px;
    }

    & .ant-menu-submenu-open,
    .ant-menu-submenu-selected {
      background-color: #152f4b;

      & .ant-menu-item {
        margin-left: 16px;
        width: auto;
      }

      & .ant-menu-item-selected {
        background-color: #193f62;
      }
    }

    & .anticon {
      font-size: 24px;
    }
  }

  .ant-menu-vertical {
    & .ant-menu-submenu-selected {
      height: 40px;
      border-radius: 4px;

      & .ant-menu-submenu-title {
        margin: 0px;
      }
    }

    & .ant-menu-item,
    .ant-menu-submenu-title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px !important;

      & .anticon {
        height: 17px;
        font-size: 17px;
        line-height: 0;
      }
    }
  }
`;

const Navbar = ({
  collapsible,
  collapsed,
  onCollapse,
  collapsedWidth,
  breakpoint,
  onBreakpoint,
  breakpointBroken,
}) => {
  const treeRoute = useSelector(MenuSelectors.selectTreeMenu);
  const flatRoute = useSelector(MenuSelectors.selectFlatMenu);
  const { pathname } = useLocation();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(null);

  console.log(breakpoint);

  // Getting default open keys is computationally intensive, and we only need to run it once when screen first start up
  useEffect(() => {
    setDefaultOpenKeys(getDefaultOpenKeys(flatRoute, pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!defaultOpenKeys) return null;

  const recursivelyGenerateMenuItems = (route) => {
    if (route.isHidden) return null;

    if (route.subRoutes && route.subRoutes.length > 0) {
      return (
        <SubMenu
          key={route.path}
          title={
            <span>
              {route.icon && (
                <Icon name={route.icon} style={{ verticalAlign: 'middle' }} />
              )}
              <span>{route.title}</span>
            </span>
          }
        >
          {route.subRoutes.map((childRoute) =>
            recursivelyGenerateMenuItems(childRoute),
          )}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={route.path}>
        {route.icon && (
          <Icon name={route.icon} style={{ verticalAlign: 'middle' }} />
        )}
        <span>{route.title}</span>
        <Link to={route.path} />
      </Menu.Item>
    );
  };

  return (
    <Sider
      trigger={!breakpointBroken && null}
      collapsible={collapsible}
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsedWidth={collapsedWidth}
      breakpoint={breakpoint}
      onBreakpoint={onBreakpoint}
      width={228}
    >
      <Wrapper collapsed={collapsed}>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={defaultOpenKeys}
          inlineIndent={8}
          mode="inline"
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {treeRoute.map((route) => recursivelyGenerateMenuItems(route))}
          <div style={{ flexGrow: 1 }} />
          <Menu.Item key="help">
            <Icon name={'help'} style={{ verticalAlign: 'middle' }} />
            <span>Help / FAQs</span>
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon name={'settings'} style={{ verticalAlign: 'middle' }} />
            <span>Settings</span>
          </Menu.Item>
        </Menu>
      </Wrapper>
    </Sider>
  );
};

export default Navbar;
