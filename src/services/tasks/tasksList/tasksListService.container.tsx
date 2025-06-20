import { tasksListService } from "./tasksListService.models";
import { TasksList } from "./TasksList/TasksList";
import { useUnit } from "effector-react";
import {
  contractsListQuery,
  customersListQuery,
  executingContractsListQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";

const {
  gates: { TasksListGate },
} = tasksListService;

export const TasksListContainer = () => {
  const {
    tasksListPagedList,
    isLoading,
    filters,
    setTasksListFilters,
    nomenclatures,
    customers,
    contracts,
    executingContracts,
  } = useUnit({
    tasksListPagedList: tasksListQuery.$data,
    isLoading: tasksListQuery.$pending,
    filters: tasksListService.outputs.$tasksListFilters,
    setTasksListFilters: tasksListService.inputs.setTasksListFilters,
    nomenclatures: nomenclaturesListQuery.$data,
    customers: customersListQuery.$data,
    contracts: contractsListQuery.$data,
    executingContracts: executingContractsListQuery.$data,
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
        customers={customers}
        contracts={contracts}
        executingContracts={executingContracts}
      />
    </>
  );
};
