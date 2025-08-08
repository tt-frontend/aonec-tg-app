import { combine, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  addressesOfTasksQuery,
  contractsListQuery,
  executingContractsListQuery,
  nomenclatureCharacteristicsQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";
import {
  GetNomenclaturesQueryParams,
  GetTasksListQueryParams,
} from "./tasksListService.types";
import { EProductionOrderStatus } from "@/api/types";

const TasksListGate = createGate<{ status: EProductionOrderStatus }>();

const setTasksListFilters = createEvent<GetTasksListQueryParams>();
const resetFilters = createEvent();

const reload = createEvent();

const $tasksListFilters = createStore<GetTasksListQueryParams>({
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

const $preparedFilters = combine(
  $tasksListFilters,
  TasksListGate.state,
  (filters, { status }): GetTasksListQueryParams => ({
    ...filters,
    Status: status,
  })
);

sample({
  source: $preparedFilters,
  clock: [TasksListGate.open, $tasksListFilters.updates, reload],
  fn: (filters): GetTasksListQueryParams => {
    return {
      ...filters,
      ContractIds: filters.ContractIds?.map((elem) => {
        return (elem as number | string) === NO_CONTRACT_FLAG ? null : elem;
      }),
    };
  },
  target: tasksListQuery.start,
});

sample({
  source: $preparedFilters,
  clock: TasksListGate.open,
  fn: ({ Status }): GetNomenclaturesQueryParams => ({
    ProductionOrderStatus: Status,
  }),
  target: nomenclaturesListQuery.start,
});

sample({
  source: $preparedFilters,
  clock: TasksListGate.open,
  fn: ({ Status }): GetNomenclaturesQueryParams => ({
    ProductionOrderStatus: Status,
  }),
  target: contractsListQuery.start,
});

sample({
  source: $preparedFilters,
  clock: TasksListGate.open,
  fn: ({ Status }): GetNomenclaturesQueryParams => ({
    ProductionOrderStatus: Status,
  }),
  target: executingContractsListQuery.start,
});

sample({
  source: $preparedFilters,
  clock: TasksListGate.open,
  fn: ({ Status }): GetNomenclaturesQueryParams => ({
    ProductionOrderStatus: Status,
  }),
  target: addressesOfTasksQuery.start,
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
  inputs: { setTasksListFilters, resetFilters, reload },
  outputs: { $tasksListFilters, $tasksList },
  gates: { TasksListGate },
};
