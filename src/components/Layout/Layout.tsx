import { Outlet } from "react-router-dom";
import { Content, Wrapper } from "./Layout.styled";
import { InstallAppPrompt } from "../InstallAppPrompt";

export const Layout = () => {
  return (
    <Wrapper>
      <Content>
        <Outlet />
      </Content>
      <InstallAppPrompt />
    </Wrapper>
  );
};
