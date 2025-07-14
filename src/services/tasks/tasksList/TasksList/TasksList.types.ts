import {
  CharacteristicResponse,
  ContractListResponsePagedList,
  NomenclatureListResponse,
  ProductionOrderListResponsePagedList,
} from "@/api/types";
import { GetTasksListQueryParams } from "../tasksListService.types";

export type Props = {
  tasksListPagedList: ProductionOrderListResponsePagedList | null;
  isLoading: boolean;
  setTasksListFilters: (filters: GetTasksListQueryParams) => void;
  filters: GetTasksListQueryParams;
  nomenclatures: NomenclatureListResponse[] | null;
  contracts: ContractListResponsePagedList | null;
  executingContracts: ContractListResponsePagedList | null;
  characteristics: CharacteristicResponse[] | null;
  resetFilters: () => void;
};
