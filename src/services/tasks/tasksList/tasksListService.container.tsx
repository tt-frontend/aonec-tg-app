import { tasksListService } from "./tasksListService.models";
import { TasksList } from "./TasksList/TasksList";
import { useUnit } from "effector-react";
import { tasksListQuery } from "./tasksListService.api";

const {
  gates: { TasksListGate },
} = tasksListService;

export const TasksListContainer = () => {
  const { tasksListPagedList, isLoading, filters, setTasksListFilters } = useUnit({
    tasksListPagedList: tasksListQuery.$data,
    isLoading: tasksListQuery.$pending,
    filters: tasksListService.outputs.$tasksListFilters,
    setTasksListFilters: tasksListService.inputs.setTasksListFilters,
  });

  return (
    <>
      <TasksListGate />
      <TasksList
        tasksListPagedList={tasksListPagedList}
        isLoading={isLoading}
        setTasksListFilters={setTasksListFilters}
        filters={filters}
      />
    </>
  );
};
