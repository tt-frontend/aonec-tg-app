import { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
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
};
