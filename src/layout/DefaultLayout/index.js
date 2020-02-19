import { Button, Layout } from "antd";
import Navbar from "../../components/Router/Navbar";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import SwitchBoard from "../../components/Router/SwitchBoard";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { rebuildPath } from "../../components/Router/utils";

const { Header, Content } = Layout;

const DefaultLayout = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [breakpointBroken, setBreakpointBroken] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleBreakpoint = broken => {
    setBreakpointBroken(broken);
    if (broken) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(80);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        collapsedWidth={collapsedWidth}
        breakpoint="sm"
        onBreakpoint={toggleBreakpoint}
      />
      <Layout>
        <Header style={{ background: "#fff", padding: 0, paddingLeft: 16 }}>
          {!breakpointBroken && (
            <Button icon={<MenuUnfoldOutlined />} onClick={toggle} />
          )}
        </Header>
        <Content style={{ minHeight: 280 }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
