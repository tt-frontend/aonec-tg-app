import {
  ContractListResponsePagedList,
  NomenclatureListResponse,
  ProductionOrderListResponsePagedList,
  StringPagedList,
} from "@/api/types";
import { GetTasksListQueryParams } from "../tasksListService.types";

export type Props = {
  tasksListPagedList: ProductionOrderListResponsePagedList | null;
  isLoading: boolean;
  setTasksListFilters: (filters: GetTasksListQueryParams) => void;
  filters: GetTasksListQueryParams;
  nomenclatures: NomenclatureListResponse[] | null;
  customers: StringPagedList | null;
  contracts: ContractListResponsePagedList | null;
  executingContracts: ContractListResponsePagedList | null;
};
