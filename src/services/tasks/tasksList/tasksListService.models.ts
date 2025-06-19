import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { tasksListQuery } from "./tasksListService.api";
import { GetTasksListQueryParams } from "./tasksListService.types";

const TasksListGate = createGate();
const setTasksListFilters = createEvent<GetTasksListQueryParams>();
const $tasksListFilters = createStore<GetTasksListQueryParams>({}).on(
  setTasksListFilters,
  (_, filters) => filters
);

sample({
  source: $tasksListFilters,
  clock: TasksListGate.open,
  target: tasksListQuery.start,
});

export const tasksListService = {
  inputs: { setTasksListFilters },
  outputs: { $tasksListFilters },
  gates: { TasksListGate },
};
