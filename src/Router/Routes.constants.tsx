import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LoginContainer } from "@/services/login";
import { MainPageContainer } from "@/services/mainPage";
import { TasksListContainer } from "@/services/tasks/tasksList";
import { TaskProfileContainer } from "@/services/tasks/taskProfile";
import { EProductionOrderStatus } from "@/api/types";

export const getRoutes = (isAuth: boolean): RouteObject[] => [
  {
    path: "/",
    element: <Layout />,
    children: isAuth
      ? [
          {
            path: "/",
            element: <MainPageContainer />,
          },
          {
            path: "/tasks/:id",
            element: <TaskProfileContainer />,
          },
          {
            path: "/tasks",
            element: (
              <TasksListContainer status={EProductionOrderStatus.InProgress} />
            ),
          },
          {
            path: "/archiveTasks",
            element: (
              <TasksListContainer status={EProductionOrderStatus.Archived} />
            ),
          },
          {
            path: "*",
            element: <Navigate to="/" />,
          },
        ]
      : [
          {
            path: "/login",
            element: <LoginContainer />,
          },
          {
            path: "/",
            element: <Navigate to="/login" />,
          },
          {
            path: "*",
            element: <Navigate to="/login" />,
          },
        ],
  },
];
