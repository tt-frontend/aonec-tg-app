import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./Router";
import { ConfigProvider } from "antd";
import ruRu from "antd/locale/ru_RU";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Telegram.WebApp.enableClosingConfirmation();
  }, []);
  return (
    <BrowserRouter>
      <ConfigProvider
        locale={ruRu}
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#000000",
            borderRadius: 0,
            fontFamily: "Rubik",

            // Alias Token
          },
          components: {
            Input: {
              activeBorderColor: "none",
              boxShadow: "none",
              controlOutline: "none",
              colorBorder: "transparent",
              hoverBorderColor: "transparent",
            },
            Segmented: {
              borderRadius: 0,
              trackBg: "black",
              itemColor: "white",
              trackPadding: 3,
            },
            Button: {
              defaultBorderColor: "#000000",
            },
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
