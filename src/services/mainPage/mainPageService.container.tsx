import { useUnit } from "effector-react";
import { MainPage } from "./MainPage/MainPage";
import { authService } from "../authService";
import { currentUserQuery, tasksCountQuery } from "./mainPageService.api";
import { mainPageService } from "./mainPageService.models";

const {
  gates: { MainPageGate },
} = mainPageService;

export const MainPageContainer = () => {
  const { logoutUser, currentUser, tasksCountData, isLoading } = useUnit({
    logoutUser: authService.inputs.logoutUser,
    currentUser: currentUserQuery.$data,
    tasksCountData: tasksCountQuery.$data,
    isLoading: currentUserQuery.$pending,
  });

  const tasksCount = tasksCountData?.totalItems || null;

  return (
    <>
      <MainPageGate />
      <MainPage
        logoutUser={logoutUser}
        currentUser={currentUser}
        tasksCount={tasksCount}
        isLoading={isLoading}
      />
    </>
  );
};
