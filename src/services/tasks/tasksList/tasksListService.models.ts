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
import {
  EProductionOrderStatus,
  ProductionOrderListResponse,
} from "@/api/types";

const TasksListGate = createGate();

const setTasksListFilters = createEvent<GetTasksListQueryParams>();
const resetFilters = createEvent();

const nextPage = createEvent();
const onNextPage = createEvent();

const initialLoadTasks = createEvent();

const $tasksListFilters = createStore<GetTasksListQueryParams>({
  Status: EProductionOrderStatus.InProgress,
  PageSize: 15,
  PageNumber: 1,
})
  .on(setTasksListFilters, (prev, filters) => ({ ...prev, ...filters }))
  .on(onNextPage, (prev) => ({
    ...prev,
    PageNumber: (prev.PageNumber || 1) + 1,
  }))
  .reset(resetFilters);

const $isAllowNextPage = tasksListQuery.$pending.map((isLoading) => !isLoading);

sample({
  clock: nextPage,
  filter: $isAllowNextPage,
  target: onNextPage,
});

const $tasksList = createStore<ProductionOrderListResponse[]>([])
  .on(tasksListQuery.finished.success, (prev, { result }) => [
    ...prev,
    ...(result.items || []),
  ])
  .reset(resetFilters, setTasksListFilters);

export const NO_CONTRACT_FLAG = "NO_CONTRACT";

const $isAllowInitialLoadByGate = $tasksList.map((list) => !list.length);

sample({
  clock: TasksListGate.open,
  filter: $isAllowInitialLoadByGate,
  target: initialLoadTasks,
});

sample({
  source: $tasksListFilters,
  clock: [initialLoadTasks, $tasksListFilters.updates],
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

sample({
  clock: TasksListGate.open,
  target: addressesOfTasksQuery.start.prepend(() => ({})),
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
  inputs: { setTasksListFilters, resetFilters, nextPage },
  outputs: { $tasksListFilters, $tasksList },
  gates: { TasksListGate },
};
