import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  contractsListQuery,
  customersListQuery,
  executingContractsListQuery,
  nomenclatureCharacteristicsQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";
import { GetTasksListQueryParams } from "./tasksListService.types";
import { ProductionOrderGroupingFilter } from "@/api/types";

const TasksListGate = createGate();

const setTasksListFilters = createEvent<GetTasksListQueryParams>();
const applyFilters = createEvent();
const resetFilters = createEvent();

const $tasksListFilters = createStore<GetTasksListQueryParams>({
  GroupType: ProductionOrderGroupingFilter.Executing,
})
  .on(setTasksListFilters, (prev, filters) => ({ ...prev, ...filters }))
  .reset(resetFilters);

sample({
  source: $tasksListFilters,
  clock: [TasksListGate.open, applyFilters],
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

const $selectecNomenclature = $tasksListFilters.map(
  ({ NomenclatureId }) => NomenclatureId
);

sample({
  source: $selectecNomenclature,
  filter: Boolean,
  target: nomenclatureCharacteristicsQuery.start,
});

export const tasksListService = {
  inputs: { setTasksListFilters },
  outputs: { $tasksListFilters },
  gates: { TasksListGate },
};
