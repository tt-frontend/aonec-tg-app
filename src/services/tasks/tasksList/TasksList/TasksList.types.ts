import {
  AddressResponsePagedList,
  CharacteristicResponse,
  ContractListResponsePagedList,
  NomenclatureListResponse,
  ProductionOrderListResponse,
  ProductionOrderListResponsePagedList,
} from "@/api/types";
import { GetTasksListQueryParams } from "../tasksListService.types";

export type Props = {
  tasksListPagedList: ProductionOrderListResponsePagedList | null;
  tasksList: ProductionOrderListResponse[];
  isLoading: boolean;
  setTasksListFilters: (filters: GetTasksListQueryParams) => void;
  filters: GetTasksListQueryParams;
  nomenclatures: NomenclatureListResponse[] | null;
  contracts: ContractListResponsePagedList | null;
  executingContracts: ContractListResponsePagedList | null;
  characteristics: CharacteristicResponse[] | null;
  resetFilters: () => void;
  addressesList: AddressResponsePagedList | null;
};
