import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  contractsListQuery,
  customersListQuery,
  executingContractsListQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";
import { GetTasksListQueryParams } from "./tasksListService.types";
import { ProductionOrderGroupingFilter } from "@/api/types";

const TasksListGate = createGate();
const setTasksListFilters = createEvent<GetTasksListQueryParams>();
const $tasksListFilters = createStore<GetTasksListQueryParams>({
  GroupType: ProductionOrderGroupingFilter.Executing,
}).on(setTasksListFilters, (_, filters) => filters);

sample({
  source: $tasksListFilters,
  clock: TasksListGate.open,
  target: tasksListQuery.start,
});

sample({
  clock: TasksListGate.open,
  target: nomenclaturesListQuery.start.prepend(() => ({})),
});
sample({
  clock: TasksListGate.open,
  target: customersListQuery.start.prepend(() => ({})),
});
sample({
  clock: TasksListGate.open,
  target: contractsListQuery.start.prepend(() => ({})),
});
sample({
  clock: TasksListGate.open,
  target: executingContractsListQuery.start.prepend(() => ({})),
});

export const tasksListService = {
  inputs: { setTasksListFilters },
  outputs: { $tasksListFilters },
  gates: { TasksListGate },
};
