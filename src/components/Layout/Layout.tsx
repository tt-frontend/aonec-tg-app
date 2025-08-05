import { Outlet } from "react-router-dom";
import { Content, Wrapper } from "./Layout.styled";

export const Layout = () => {
  return (
    <Wrapper>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};
