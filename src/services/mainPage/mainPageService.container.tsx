import { useUnit } from "effector-react";
import { MainPage } from "./MainPage/MainPage";
import { authService } from "../authService";

export const MainPageContainer = () => {
  const { logoutUser } = useUnit({ logoutUser: authService.inputs.logoutUser });

  return (
    <>
      <MainPage logoutUser={logoutUser} />
    </>
  );
};
