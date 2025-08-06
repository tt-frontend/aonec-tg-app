import { ExecutorResponse } from "@/api/types";

export type Props = {
  logoutUser: () => void;
  currentUser: ExecutorResponse | null;
  tasksCount: number | null;
  archivedTasksCount: number | null;
  isLoading: boolean;
};
