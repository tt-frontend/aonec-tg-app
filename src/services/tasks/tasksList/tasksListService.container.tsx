import { tasksListService } from "./tasksListService.models";
import { TasksList } from "./TasksList/TasksList";
import { useUnit } from "effector-react";
import {
  addressesOfTasksQuery,
  contractsListQuery,
  executingContractsListQuery,
  nomenclatureCharacteristicsQuery,
  nomenclaturesListQuery,
  tasksListQuery,
} from "./tasksListService.api";
import { FC } from "react";
import { EProductionOrderStatus } from "@/api/types";

const {
  inputs,
  outputs,
  gates: { TasksListGate },
} = tasksListService;

export const TasksListContainer: FC<{
  status: EProductionOrderStatus;
}> = ({ status }) => {
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
    addressesList,
    tasksList,
    handleReload,
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
    addressesList: addressesOfTasksQuery.$data,
    tasksList: outputs.$tasksList,
    handleReload: inputs.reload,
  });

  return (
    <>
      <TasksListGate status={status} />
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
        addressesList={addressesList}
        tasksList={tasksList}
        handleReload={handleReload}
        status={status}
      />
    </>
  );
};
