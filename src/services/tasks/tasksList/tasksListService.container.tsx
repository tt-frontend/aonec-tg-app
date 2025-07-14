import { tasksListService } from "./tasksListService.models";
import { TasksList } from "./TasksList/TasksList";
import { useUnit } from "effector-react";
import {
  contractsListQuery,
  executingContractsListQuery,
  nomenclatureCharacteristicsQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";

const {
  inputs,
  gates: { TasksListGate },
} = tasksListService;

export const TasksListContainer = () => {
  const {
    tasksListPagedList,
    isLoading,
    filters,
    setTasksListFilters,
    nomenclatures,
    contracts,
    executingContracts,
    characteristics,
    resetFilters,
  } = useUnit({
    tasksListPagedList: tasksListQuery.$data,
    isLoading: tasksListQuery.$pending,
    filters: tasksListService.outputs.$tasksListFilters,
    setTasksListFilters: tasksListService.inputs.setTasksListFilters,
    nomenclatures: nomenclaturesListQuery.$data,
    contracts: contractsListQuery.$data,
    executingContracts: executingContractsListQuery.$data,
    characteristics: nomenclatureCharacteristicsQuery.$data,
    resetFilters: inputs.resetFilters,
  });

  return (
    <>
      <TasksListGate />
      <TasksList
        tasksListPagedList={tasksListPagedList}
        isLoading={isLoading}
        setTasksListFilters={setTasksListFilters}
        filters={filters}
        nomenclatures={nomenclatures}
        contracts={contracts}
        executingContracts={executingContracts}
        characteristics={characteristics}
        resetFilters={resetFilters}
      />
    </>
  );
};
