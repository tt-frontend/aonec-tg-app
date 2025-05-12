import { Outlet } from "react-router-dom";
import { Wrapper } from "./Layout.styled";

export const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
