import { createStore, sample } from "effector";
import { createGate } from "effector-react";
import { tasksListQuery } from "./tasksListService.api";
import { GetTasksListQueryParams } from "./tasksListService.types";

const TasksListGate = createGate();

const $tasksListFilters = createStore<GetTasksListQueryParams>({});

sample({
  source: $tasksListFilters,
  clock: TasksListGate.open,
  target: tasksListQuery.start,
});

export const tasksListService = {
  inputs: {},
  outputs: {},
  gates: { TasksListGate },
};
