import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from '../../store/hooks';
import Navbar from '../../components/Router/Navbar';
import { AuthActions, AuthSelectors } from '../../store/modules/auth';

const { Header, Content } = Layout;

const DefaultLayout = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [breakpointBroken, setBreakpointBroken] = useState(false);
  const isLoggedIn = useSelector(AuthSelectors.selectLoggedIn);

  const onCollapse = (collapseStatus) => {
    setCollapsed(collapseStatus);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleBreakpoint = (broken) => {
    setBreakpointBroken(broken);
    if (broken) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(80);
    }
  };

  const logout = () => {
    dispatch(AuthActions.logout.request());
  };

  if (!isLoggedIn) {
    return <div>{children}</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        collapsedWidth={collapsedWidth}
        breakpoint="sm"
        onBreakpoint={toggleBreakpoint}
      />
      <Layout>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
          {!breakpointBroken && (
            <Button icon={<MenuUnfoldOutlined />} onClick={toggle} />
          )}
          {isLoggedIn && <Button icon={<LogoutOutlined />} onClick={logout} />}
        </Header>
        <Content style={{ minHeight: 280 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
