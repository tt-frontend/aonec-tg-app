import { useUnit } from "effector-react";
import { MainPage } from "./MainPage/MainPage";
import { authService } from "../authService";
import {
  archiveTasksCountQuery,
  currentUserQuery,
  tasksCountQuery,
} from "./mainPageService.api";
import { mainPageService } from "./mainPageService.models";
import { tasksListService } from "../tasks/tasksList/tasksListService.models";
import { useEffect } from "react";

const {
  gates: { MainPageGate },
} = mainPageService;

export const MainPageContainer = () => {
  const {
    logoutUser,
    currentUser,
    tasksCountData,
    isLoading,
    archivedTasksData,
    resetTasksPageFilters,
  } = useUnit({
    logoutUser: authService.inputs.logoutUser,
    currentUser: currentUserQuery.$data,
    tasksCountData: tasksCountQuery.$data,
    isLoading: currentUserQuery.$pending,
    archivedTasksData: archiveTasksCountQuery.$data,
    resetTasksPageFilters: tasksListService.inputs.resetFilters,
  });

  const tasksCount = tasksCountData?.totalItems || null;
  const archivedTasksCount = archivedTasksData?.totalItems || null;

  useEffect(resetTasksPageFilters, [resetTasksPageFilters]);

  return (
    <>
      <MainPageGate />
      <MainPage
        logoutUser={logoutUser}
        currentUser={currentUser}
        tasksCount={tasksCount}
        isLoading={isLoading}
        archivedTasksCount={archivedTasksCount}
      />
    </>
  );
};
