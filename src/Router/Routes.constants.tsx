import { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LoginContainer } from "@/services/login";
import { MainPageContainer } from "@/services/mainPage";
import { TasksListContainer } from "@/services/tasks/tasksList";

export const getRoutes = (): RouteObject[] => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPageContainer />,
      },
      {
        path: "/login",
        element: <LoginContainer />,
      },
      {
        path: "/tasks",
        element: <TasksListContainer />,
      },
    ],
  },
];
