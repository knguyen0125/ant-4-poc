import React, { useState, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Button, Layout, ConfigProvider } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Navbar from "./components/Router/Navbar";
import SwitchBoard from "./components/Router/SwitchBoard";
import { rebuildPath } from "./components/Router/utils";

const { Header, Content } = Layout;

const routes = [
  {
    title: "Home",
    component: "home",
    id: 1,
    parentId: null,
    order: 1,
    isPrivate: true,
    path: "",
    isExact: true,
    isHidden: false
  },
  {
    title: "Service",
    component: "dummy",
    id: 2,
    parentId: null,
    order: 2,
    isPrivate: true,
    path: "service",
    isExact: true,
    isHidden: false
  },
  {
    title: "Service List",
    component: "service",
    id: 3,
    parentId: 2,
    order: 1,
    isPrivate: true,
    path: "list",
    isExact: false,
    isHidden: false
  },
  {
    title: "Service With Params",
    component: "serviceWithParams",
    id: 4,
    parentId: 2,
    order: 2,
    isPrivate: true,
    path: ":id",
    isExact: false,
    isHidden: true
  }
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [breakpointBroken, setBreakpointBroken] = useState(false);
  const rebuiltRoute = useMemo(() => rebuildPath(routes), []);

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
    <ConfigProvider>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Navbar
            routes={rebuiltRoute}
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
            <Content style={{ minHeight: 280 }}>
              <SwitchBoard routes={rebuiltRoute} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
