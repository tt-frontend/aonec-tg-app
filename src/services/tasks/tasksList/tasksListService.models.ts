import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  addressesOfTasksQuery,
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
  PageSize: 10,
  PageNumber: 1,
})
  .on(setTasksListFilters, (prev, filters) => ({
    ...prev,
    PageNumber: 1,
    ...filters,
  }))
  .reset(resetFilters);

const $tasksList = tasksListQuery.$data.map((data) => data?.items || []);

export const NO_CONTRACT_FLAG = "NO_CONTRACT";

sample({
  source: $tasksListFilters,
  clock: [TasksListGate.open, $tasksListFilters.updates],
  fn: (filters): GetTasksListQueryParams => {
    return {
      ...filters,
      ContractIdHasValue: Boolean(filters.ContractIdValue),
      ContractIdValue:
        filters.ContractIdValue === NO_CONTRACT_FLAG
          ? null
          : filters.ContractIdValue,
    };
  },
  target: tasksListQuery.start,
});

sample({
  clock: TasksListGate.open,
  target: nomenclaturesListQuery.start.prepend(() => ({
    ProductionOrderStatus: EProductionOrderStatus.InProgress,
  })),
});

sample({
  clock: TasksListGate.open,
  target: contractsListQuery.start.prepend(() => ({
    ProductionOrderStatus: EProductionOrderStatus.InProgress,
  })),
});

sample({
  clock: TasksListGate.open,
  target: executingContractsListQuery.start.prepend(() => ({
    ProductionOrderStatus: EProductionOrderStatus.InProgress,
  })),
});

sample({
  clock: TasksListGate.open,
  target: addressesOfTasksQuery.start.prepend(() => ({
    ProductionOrderStatus: EProductionOrderStatus.InProgress,
  })),
});

const $selectedNomenclature = $tasksListFilters.map(
  ({ NomenclatureId }) => NomenclatureId
);

sample({
  source: $selectedNomenclature,
  filter: Boolean,
  target: nomenclatureCharacteristicsQuery.start,
});

export const tasksListService = {
  inputs: { setTasksListFilters, resetFilters },
  outputs: { $tasksListFilters, $tasksList },
  gates: { TasksListGate },
};
