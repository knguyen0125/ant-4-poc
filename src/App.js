import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import SwitchBoard from "./components/Router/SwitchBoard";
import { useDispatch, useSelector } from "react-redux";
import { getMenu, menuSelector } from "./store/modules/menu";

function App() {
  const dispatch = useDispatch();
  const routes = useSelector(menuSelector);

  React.useEffect(() => {
    dispatch(getMenu({ redirect: true }));
  }, []);

  return (
    <ConfigProvider>
      <SwitchBoard />
    </ConfigProvider>
  );
}

export default App;
