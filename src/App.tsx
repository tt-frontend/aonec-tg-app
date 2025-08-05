import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./Router";
import { ConfigProvider } from "antd";
import ruRu from "antd/locale/ru_RU";
import { useEffect } from "react";
import { themeConfig } from "./themeConfig";

function App() {
  useEffect(() => {
    Telegram.WebApp.enableClosingConfirmation();
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider locale={ruRu} theme={themeConfig}>
        <Router />{" "}
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
