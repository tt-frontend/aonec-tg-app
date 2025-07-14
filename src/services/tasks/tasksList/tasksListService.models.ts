import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  contractsListQuery,
  executingContractsListQuery,
  nomenclatureCharacteristicsQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";
import { GetTasksListQueryParams } from "./tasksListService.types";
import { EProductionOrderStatus } from "@/api/types";

const TasksListGate = createGate();

const setTasksListFilters = createEvent<GetTasksListQueryParams>();
const resetFilters = createEvent();

const $tasksListFilters = createStore<GetTasksListQueryParams>({
  Status: EProductionOrderStatus.InProgress,
})
  .on(setTasksListFilters, (prev, filters) => ({ ...prev, ...filters }))
  .reset(resetFilters);

sample({
  source: $tasksListFilters,
  clock: [TasksListGate.open, $tasksListFilters.updates],
  target: tasksListQuery.start,
});

sample({
  clock: TasksListGate.open,
  target: nomenclaturesListQuery.start.prepend(() => ({})),
});

sample({
  clock: TasksListGate.open,
  target: contractsListQuery.start.prepend(() => ({})),
});

sample({
  clock: TasksListGate.open,
  target: executingContractsListQuery.start.prepend(() => ({})),
});

const $selectecNomenclature = $tasksListFilters.map(
  ({ NomenclatureId }) => NomenclatureId
);

sample({
  source: $selectecNomenclature,
  filter: Boolean,
  target: nomenclatureCharacteristicsQuery.start,
});

export const tasksListService = {
  inputs: { setTasksListFilters, resetFilters },
  outputs: { $tasksListFilters },
  gates: { TasksListGate },
};
